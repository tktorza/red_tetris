const Piece = require('./Piece.Class')
const Player = require('./Players.Class')


module.exports = class Game {
	constructor(id, socketId, playerName){
		this.game = {id : id, piece : [], player : [], start: false}
		this.addPiece()
		this.addFirstPlayer(socketId, playerName)
	}
	get Game(){
		return this.game
	}
	addPlayer(socketId, playerName){
		if (this.game.start){
			this.game.player.push(new Player(this.game.player.length, socketId, playerName, true, false))
		}else{
			this.game.player.push(new Player(this.game.player.length, socketId, playerName, false, false))
			this.game.player[this.game.player.length -1].addPiece(this.game.piece)
		}

	}
	addFirstPlayer(socketId, playerName){
		this.game.player.push(new Player(0, socketId, playerName, false, true))
		this.game.player[this.game.player.length -1].addPiece(this.game.piece)
	}
	removePlayer(i){
		if (i == 0 && this.game.player.length > 1){
			this.game.player[1].player.isFirst = true
		}
		this.game.player.splice(i, 1)
	}
	startGame(){
		this.game.start = true
	}
	restartGame(){
		this.game.start = false
	}
	addPiece(){
		this.game.piece = []
		for (let i = 0; i < 5; i++){
			this.game.piece[i] =  new Piece()
		}
	}
}

