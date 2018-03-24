const Piece = require('./Class/Piece.Class')

exports.default=(socket) => {
	socket.on('startNewGame', (data) => {
		console.log(data)
		startNewGame(data, socket)
	})
}

const startNewGame = (data, socket) => {
	// const PiecesForStart = snew Piece.default
	
	// PiecesForStart.createPiece().then(result => {
	// 	console.log(result + "1111")
	// 	io.emit('New_Piece', result)
	// })
	// PiecesForStart.createPiece().then(response => {
	// 	console.log(response + "2222")
	// 	io.emit('New_Piece', response)
	// })
}

