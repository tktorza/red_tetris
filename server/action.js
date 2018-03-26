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
exports.default=(socket) => {
	socket.on('startNewGame', (data) => {
		console.log("on est la dedans")
		console.log(socket.id)
		startNewGame(data, socket)
		//get game id
		
	})
}

const startNewGame = (data, socket) => {
	// const PiecesForStart = snew Piece.default
	
	// PiecesForStart.createPiece().then(result => {
	// 	console.log(result + "1111")
	console.log("on mais pq pas la ?")
		data.payload = piece
		let id = game.length
		game.push(new Game(id, socket.id))
		console.log(game[0].Game)
		console.log(game[0].Game.player[0].player)
		console.log("lalalalalala")
		console.log(data)
		io.emit('piece', data)
	// })
	// PiecesForStart.createPiece().then(response => {
	// 	console.log(response + "2222")
	// 	io.emit('New_Piece', response)
	// })
}

