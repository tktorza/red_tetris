const Game = require('./Game.Class')

module.exports = class Player {
	constructor(id, socket, playerName, isVisitor, isFirst){
		this.player = {
			id : id, 
			currentPiece : {}, 
			nextPiece : [], 
			socketId : socket, 
			isVisitor : isVisitor, 
			playerName : playerName,
			isFirst : isFirst,
			isLooser : false,
			isWinnew : false
		}
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