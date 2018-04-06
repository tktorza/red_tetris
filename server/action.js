const Game = require('./Class/Game.Class.js')
let game = []



const piece = {
        type : 5,
        coord : [
                    { x : 4, y : 0 },
                    { x : 4, y : 1 },
                    { x : 4, y : 2 },
                    { x : 5, y : 2 }
                ]
    }


exports.default = (socket) => {
	socket.on("GET_CURRENT_ROOMS", data => {
		let rooms = [1, 2, 3, 4, 5, 6]
		io.to(socket.id).emit('action', {
			type : 'GET_CURRENT_ROOMS',
			payload : game
		})
	})
	socket.on('CREATE_GAME', (data) => {
		console.log("GAME START  + = ", game)
		startNewGame(data, socket)
		//get game id
		
	})

	socket.on('GET_MORE_PIECE', data => {
		refreshGamePiece(socket, data)
	})
	
	socket.on('START_GAME', data => {
		startGame(socket, data)
	})
	
	socket.on('GET_LINE', data => {
		let i = getGameId(data.id)
		io.to(socket.id).emit('action',
		{
			type : 'GET_LINE',
			payload : data.payload
		})
		socket.broadcast.to(game[i].Game.id).emit('action',
		{
			type : 'SHARE_END_LINE',
			payload : {playerInfo : data.playerInfo, endLine : data.payload}
		})
	})
	
	socket.on('INIT_OTHER_TAB', data => {
		let i = getGameId(data.id) - 1
		socket.broadcast.to(game[i].Game.id).emit('action',
		{
			type : 'INIT_OTHER_TAB',
			payload : { player : data.playerInfo, endLine : [] }
		})
	})
	
	socket.on('initOtherTabForVisitor', data => {
		let i = getGameId(data.id) - 1
		console.log(game[i].Game.player)
		game[i].Game.player.forEach(element => {
			console.log("elem -=== ", element.player.isVisitor)
			if (element.player.isVisitor == true){
				io.to(element.player.socketId).emit('action', {
					type : 'INIT_OTHER_TAB',
					payload : { player : data.playerInfo, endLine : []}
				})
			}
		})
	})
	
	socket.on("MALUS", data => {
		let i = getGameId(data.id) - 1
		socket.broadcast.to(game[i].Game.id).emit('action',
		{
			type : 'MALUS'
		})
	})
	
	socket.on('DISCONNECTED', data =>{
		let i = getGameId(data.gameId) - 1
		if (game[i]){
			let j = getPlayerById(game[i].Game.player, data.playerInfo.id)
			game[i].removePlayer(data.playerInfo.id)
			socket.broadcast.to(game[i].Game.id).emit('action',
			{
				type : 'REMOVE_USER',
				payload : data.playerInfo.id
			})
			if (j === 0){
				if (typeof(game[i].Game.player[0]) != 'undefined'){
					io.to(game[i].Game.player[0].player.socketId).emit('action',{
						type : "REFRESH_USER_FIRST"
					})
				}
				else{
					if (game.length == 1){
						game = []
					}
					else
						game = game.splice(i, 1)
					console.log("GAME  == ", game.length)
				}
			}
		}
	})
	
	socket.on('GET_USER_IN_GAME', data => {
		let i = getGameId(data.id) - 1
		console.log("LA")
		socket.broadcast.to(game[i].Game.id).emit('action',{
			type : 'USER_GAME'
		})
	})
}

const getGameId = (id) => {
	let i = 1
	let j = 0
	game.forEach(item => {
		if (item.Game.id == id)
			j = i
		i++
	})
	return j
}

const startGame = (socket, data) => {
	let i = getGameId(data.id) - 1
	game[i].startGame()
	io.to(game[i].Game.id).emit('action',{
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

const startNewGame = (data, socket) => {
		let id = data.room
		let i = getGameId(id)
		let j = i - 1
		let piece = []
		if (i > 0){
			game[i - 1].addPlayer(socket.id, data.playerName)
		}
		else{
			game.push(new Game(id, socket.id, data.playerName))
			j = game.length - 1

		}
		let personne = getPersonneById(game[j].Game.player, data.playerName)
		game[j].Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});	
		socket.join(id, ()=> {
			console.log('join room')
		})
		io.to(socket.id).emit('action', {
			type : 'GET_CURRENT_PIECE',
			payload : game[j].Game.piece[0].piece
		})
		io.to(socket.id).emit('action', {
			type : 'GET_NEXT_PIECE',
			payload : piece.slice(1)
		})
		io.to(socket.id).emit('action', {
			type : 'CREATE_GAME',
			id : game[j].Game.id,
			isFirst : game[j].Game.player[personne].player.isFirst,
			playerInfo : {name : data.playerName, id : personne, isVisitor : game[j].Game.player[personne].player.isVisitor}
		})
			// .broadcast socket..broadcast -> tt le monde sauf soit !
		
}

const refreshGamePiece = (socket, data) => {
let i = getGameId(data.payload) - 1
let piece =[]
	game[i].addPiece()
	game[i].Game.piece.forEach( function(element, index) {
			piece.push(element.piece)
		});	
	io.to(game[i].Game.id).emit('action' , {
		type : 'GET_NEXT_PIECE',
		payload : piece
	})
}
