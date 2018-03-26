const Game = require('./Game.Class')

module.exports = class Player {
	constructor(id, socket, isVisitor){
		this.player = {id : [], currentPiece : {}, nextPiece : [], socketId : "", isVisitor : false}
		this.player.id = id
		this.player.socketId = socket
		this.player.isVisitor = isVisitor
		// this.player.nextPiece = 
		// this.Player.id = GetNewPlayerId()
	}
	addPiece (tab){
		let i = 0
		tab.forEach(item => {
			if (i == 0){
				i++
				this.player.currentPiece = Object.assign({}, item)
			}else{
				this.player.nextPiece.push(Object.assign({}, item))
			}
		})
	}
}