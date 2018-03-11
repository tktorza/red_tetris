const Game = require('./Game.Class')

module.exports = class Player {
	constructor(id, socket){
		this.player = {id : [], currentPiece : {}, nextPiece : [], socketId : ""}
		this.player.id = id
		this.player.socketId = socket
		// this.player.nextPiece = 
		// this.Player.id = GetNewPlayerId()
	}
	addPiece (tab){
		let i = 0
		tab.forEach(item => {
			if (i == 0){
				i++
				this.player.currentPiece = item
			}else{
				this.player.nextPiece.push(item)
			}
		})
	}
}
