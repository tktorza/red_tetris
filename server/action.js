const Game = require('./Class/Game.Class.js')
const cache = require('memory-cache')
let RoomId = []

exports.default = (socket) => {
	socket.on("GET_CURRENT_ROOMS", data => {
		let rooms = []
		RoomId.forEach( (element) => {
			rooms.push(cache.get(element))
		});
		io.to(socket.id).emit('action', {
			type : 'GET_CURRENT_ROOMS',
			payload : rooms
		})
	})
	socket.on('CREATE_GAME', (data) => {
		startNewGame(data, socket)
		//get game id
		
	})
	socket.on('JOIN_GAME', (data) => {
		joinGame(data, socket)
	})
	socket.on('GET_MORE_PIECE', data => {
		refreshGamePiece(socket, data)
	})
	
	socket.on('START_GAME', data => {
		startGame(socket, data)
	})
	
	socket.on('GET_LINE', data => {
		io.to(socket.id).emit('action',
		{
			type : 'GET_LINE',
			payload : data.payload
		})
		socket.broadcast.to(data.gameId).emit('action',
		{
			type : 'SHARE_END_LINE',
			payload : {playerInfo : data.playerInfo, endLine : data.payload}
		})
	})
	
	socket.on('INIT_OTHER_TAB', data => {
		socket.broadcast.to(data.id).emit('action',
		{
			type : 'INIT_OTHER_TAB',
			payload : { player : data.playerInfo, endLine : [] }
		})
	})
	
	socket.on('initOtherTabForVisitor', data => {
		let currentGame = cache.get(data.id)
		currentGame.Game.player.forEach(element => {
			if (element.player.isVisitor == true){
				io.to(element.player.socketId).emit('action', {
					type : 'INIT_OTHER_TAB',
					payload : { player : data.playerInfo, endLine : []}
				})
			}
		})
	})
	
	socket.on("MALUS", data => {
		socket.broadcast.to(data.id).emit('action',
		{
			type : 'MALUS'
		})
	})
	
	socket.on('DISCONNECTED', data =>{
		// revoir la logique : si qlq se deconnect mais quil y un un visituer => game restart ? ave lui en first
		let currentGame = cache.get(data.gameId)
		let j = getPlayerById(currentGame.Game.player, data.playerInfo.id)
		currentGame.removePlayer(data.playerInfo.id)
		socket.broadcast.to(data.gameId).emit('action',
		{
			type : 'REMOVE_USER',
			payload : data.playerInfo.id
		})
		io.to(socket.id).emit('action', {
			type : 'DISCONNECTED'
		})
		cache.put(data.gameId, currentGame)
		if (j === 0){
			if (typeof(currentGame.Game.player[0]) != 'undefined'){
				io.to(currentGame.Game.player[0].player.socketId).emit('action',{
					type : "REFRESH_USER_FIRST"
				})
			}
			else{
				RoomId = RoomId.filter(elemt => elemt != data.gameId)
				cache.del(data.gameId)
				// remove // updAte room from addUserContainer
			}
		}else if (typeof(currentGame.Game.player[0]) == 'undefined'){
			cache.del(data.gameId)
		}
	})
	socket.on('GET_USER_IN_GAME', data => {
		socket.broadcast.to(data.id).emit('action',{
			type : 'USER_GAME'
		})
	})
}

const startGame = (socket, data) => {
	let currentGame = cache.get(data.id)
	currentGame.startGame()
	io.to(data.id).emit('action',{
		type : "START_GAME"
	})

}

const getPersonneById = (tab, playerName) => {
	let i = 0
	let j = 0
	tab.forEach( function(element, index) {
		if (element.player.playerName.localeCompare(playerName) == 0)
			j = i
		i++
	});
	return j
}

const getPlayerById = (tab, id) => {
	let i = 0
	let j = 0
	tab.forEach( function(element, index) {
		if (element.player.id === id)
			j = i
		i++
	});
	return j
}

const idAvailable = (id) => {
	console.log("id")
	console.log("CAHCHE ", cache.get(id))
	if (cache.get(id) == null){
		return id
	}
	id += 1
	return idAvailable(id)
}

const startNewGame = (data, socket) => {
		console.log("CREATE GAME")
		let id = idAvailable(data.room)
		let piece = []
		let test = cache.get(id)
		let currentGame = new Game(id, socket.id, data.playerName)
		let personne = getPersonneById(currentGame.Game.player, data.playerName)
		currentGame.Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});	
		socket.join(id, ()=> {
			console.log('join room :', id)
		})
		io.to(socket.id).emit('action', {
			type : 'GET_CURRENT_PIECE',
			payload : currentGame.Game.piece[0].piece
		})
		io.to(socket.id).emit('action', {
			type : 'GET_NEXT_PIECE',
			payload : piece.slice(1)
		})
		io.to(socket.id).emit('action', {
			type : 'CREATE_GAME',
			id : id,
			isFirst : true,
			playerInfo : {name : data.playerName, id : personne, isVisitor : false}
		})
		cache.put(id, currentGame)
		RoomId.push(id)
			// .broadcast socket..broadcast -> tt le monde sauf soit !
		
}

const joinGame = (data, socket) => {
	console.log("JOIN GAME")
	let id = data.room.id
	let piece = []
	let currentGame = cache.get(id)
	currentGame.addPlayer(socket.id, data.playerName)
	// game[i].addPlayer(socket.id, data.playerName)
	let personne = getPersonneById(currentGame.Game.player, data.playerName)
	currentGame.Game.piece.forEach( function(element, index) {
		piece.push(element.piece)
	});	
	socket.join(id, ()=> {
			console.log('join room :', id)
	})
	io.to(socket.id).emit('action', {
		type : 'GET_CURRENT_PIECE',
		payload : currentGame.Game.piece[0].piece
	})
	io.to(socket.id).emit('action', {
		type : 'GET_NEXT_PIECE',
		payload : piece.slice(1)
	})
	io.to(socket.id).emit('action', {
		type : 'CREATE_GAME',
		id : id,
		isFirst : false,
		playerInfo : {name : data.playerName, id : personne, isVisitor : currentGame.Game.player[personne].player.isVisitor}
	})
}

const refreshGamePiece = (socket, data) => {
	let piece =[]
	let currentGame = cache.get(data.payload)
	currentGame.addPiece()
	currentGame.Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});	
	io.to(data.payload).emit('action' , {
		type : 'GET_NEXT_PIECE',
		payload : piece
	})
}
