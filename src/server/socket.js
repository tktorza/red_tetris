const cache = require('memory-cache'),
		Game = require('Class/Game.Class')

exports.default= (socket) => {
    socket.on('createGame', (data) => {
    	startNewGame(data, socket)
    })
    socket.on('jointGame', (data) => {
    	jointGame(data, socket, data.id)
    })
    socket.on('leaveGame', (data) => {

    })
    socket.on('endGame', data => {

    })
    socket.on('updateGame', data => {

    })
    socket.on('refreshPiece', data => {
    })
}

const startNewGame = (data, socket) => {
	if (cache.get('Game').length == 0){
		let Game = new Game(1, /*socketId*/)
		cache.put('Game', Game)
	}else{
		let currentGame = cache.get('Game')
		let i = 1
		currentGame.Game.id.forEach(elem => {
			i++
		}) 
		let Game = new Game(i, socket)
		currentGame.push(Game)
		cache.put('Game', currentGame)
	}
}

const jointGame = (data, socket, id) => {
	let currentGame = cache.get('Game')
	currentGame.forEach(item => {
		if (item.id == id){
			item.addPlayer(socketId)
		}
	})
}