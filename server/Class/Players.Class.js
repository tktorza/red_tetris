const Game = require('./Game.Class')

module.exports = class Player {
	constructor(id, socket, isVisit){
		this.player = {id : id, currentPiece : {}, nextPiece : [], socketId : socket}
		this.player.isVisit = isVisit
		// this.player.nextPiece = 
		// this.Player.id = GetNewPlayerId()
	}
	// get player(){
	// 	return this.player
	// }
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
		this.goDown()
	}
	goDown (){
		console.log(this.player.currentPiece.piece.coord[0])
		let result = this.player.currentPiece.moveDown()
		console.log(this.player.currentPiece.piece.coord[0])
		// console.log(result)
	}
	reloadPiece (tab){

	}
}
