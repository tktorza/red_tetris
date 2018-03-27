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
	socket.on('CREATE_GAME', (data) => {
		startNewGame(data, socket)
		//get game id
		
	})
	socket.on('GET_MORE_PIECE', data => {
		refreshGamePiece(socket, data)
	})
}

const startNewGame = (data, socket) => {
	
		let id = game.length
		game.push(new Game(id, socket.id))
		console.log("staertNewFame")
		io.emit('action', {
			type : 'CREATE_GAME',
			payload : game[0].Game
		})
}

const refreshGamePiece = (socket, data) => {
	console.log("isisisissi")
	console.log("data = ", data)
	console.log(game)
	game.forEach((elem) => {
			if (elem.game.id == data){
				elem.getPiece()
				io.emit('action', {
					type : "GET_NEXT_PIECE",
					payload : elem.game.piece
				})
				io.emit('action', {
					type : "CREATE_GAME",
					payload : elem.game
				})
			}
	});
}
