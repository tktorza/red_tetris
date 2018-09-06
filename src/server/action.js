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
	socket.on("RESTART_GAME", data => {
		let currentGame = cache.get(data.gameId)
		let piece = []
		
		currentGame.addPiece()
		currentGame.game.player.forEach(element => {
			element.player.isLooser = false
			element.player.isWinner = false
			element.player.isVisitor = false
			io.to(element.player.socketId).emit('action', {
				type : 'CREATE_GAME',
				id : data.gameId,
				isFirst : element.player.isFirst,
				playerInfo : {name : element.player.playerName, id : element.player.id, isVisitor : false, isWinner : false, isLooser: false}
			})
		})
		cache.put(data.gameId, currentGame)
		currentGame.Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});
		io.to(data.gameId).emit('action', {
			type : 'GET_CURRENT_PIECE',
			payload : currentGame.Game.piece[0].piece
		}).emit('action',
			{
				type : 'RESTART',
			}).emit('action', {
			type : 'GET_NEXT_PIECE',
			payload : piece.slice(1)
		}).emit("action", {
			type : "RESTART_GAME"
		})
	})
	socket.on("SHARE_WINNER", data => {
		socket.broadcast.to(data.gameId).emit("action", {type : "UPDATE_PLAYER", payload : data.playerInfo})
	})
	socket.on("IS_LOOSE", data => {
		let currentGame = cache.get(data.gameId)
		currentGame.game.player[data.playerInfo.id].player.isLooser = true
		let isLast = checkIfLastLooser(currentGame.game.player)
		if (isLast.i == 1 || isLast.i == 0){
			io.to(currentGame.game.player[isLast.j].player.socketId).emit('action', {type : "END", payload : {id : currentGame.game.player[isLast.j].player.id, name : currentGame.game.player[isLast.j].player.playerName, isVisitor : currentGame.game.player[isLast.j].player.isVisitor, isLooser : false, isWinner : true}})
			socket.broadcast.to(data.gameId).emit("action", {type : "UPDATE_PLAYER", payload : {id : currentGame.game.player[isLast.j].player.id, name : currentGame.game.player[isLast.j].player.playerName, isVisitor : currentGame.game.player[isLast.j].player.isVisitor, isLooser : false, isWinner : true}})
			io.to(data.gameId).emit('action', {type : "START_GAME"})
			currentGame.restartGame()
		}
		cache.put(data.gameId, currentGame)
		if (isLast.i != 0){
			io.to(socket.id).emit("action", {type : "END", payload : {id : currentGame.game.player[data.playerInfo.id].id, name : currentGame.game.player[data.playerInfo.id].player.playerName, isVisitor : currentGame.game.player[data.playerInfo.id].player.isVisitor, isLooser : true, isWinner : false}})
			socket.broadcast.to(data.gameId).emit("action", {type : "UPDATE_PLAYER", payload : {id : currentGame.game.player[data.playerInfo.id].player.id, name : currentGame.game.player[data.playerInfo.id].player.playerName, isVisitor : currentGame.game.player[data.playerInfo.id].player.isVisitor, isLooser : true, isWinner : false}})
		}
	})
	socket.on('CREATE_GAME', (data) => {
		console.log("la")
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
				currentGame.Game.player[0].player.isFirst = true
				currentGame.Game.player.forEach(elem => {
					elem.player.id = elem.player.id - 1
				})
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

const checkIfLastLooser = (tab) =>{
	let i = 0
	let j = 0
	for (let k = 0; k < tab.length; k++){
		if (tab[k].player.isLooser == false && tab[k].player.isVisitor == false){
			i++
			j = k
		}
	}
	return ({i, j})
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
	if (cache.get(id) == null){
		return id
	}
	id += 1
	return idAvailable(id)
}

const startNewGame = (data, socket) => {
		let id = idAvailable(data.room)
		let piece = []
		let currentGame = new Game(id, socket.id, data.playerName)
		let personne = getPersonneById(currentGame.Game.player, data.playerName)
		currentGame.Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});	
		socket.join(id, ()=> {})
		io.to(socket.id).emit('action', {
			type : 'CREATE_GAME',
			id : id,
			isFirst : true,
			playerInfo : {name : data.playerName, id : personne, isVisitor : false, isWinner : false, isLooser: false},
			currentPiece : currentGame.Game.piece[0].piece,
			nextPiece : piece.slice(1)
		})
		cache.put(id, currentGame)
		RoomId.push(id)
}

const joinGame = (data, socket) => {
	let id = data.room.id
	let piece = []
	let currentGame = cache.get(id)
	currentGame.addPlayer(socket.id, data.playerName)
	let personne = getPersonneById(currentGame.Game.player, data.playerName)
	currentGame.Game.piece.forEach( function(element, index) {
		piece.push(element.piece)
	});	
	socket.join(id, ()=> {
	})
	io.to(socket.id).emit('action', {
		type : 'CREATE_GAME',
		id : id,
		isFirst : false,
		playerInfo : {name : data.playerName, id : personne, isVisitor : currentGame.Game.player[personne].player.isVisitor, isWinner : false, isLooser: false},
		currentPiece : currentGame.Game.piece[0].piece,
		nextPiece : piece.slice(1)
	})
	if (currentGame.Game.player[personne].player.isVisitor == true){
		io.to(socket.id).emit('action', {
			type : "START_GAME"
		})
	}
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
