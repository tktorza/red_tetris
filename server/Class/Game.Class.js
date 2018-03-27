const Piece = require('./Piece.Class')
const Player = require('./Players.Class')

module.exports = class Game {
	constructor(id, socketId){
		this.game = {id : id, piece : [], player : [], start: false}
		this.getPiece()
		this.addPlayer(socketId)
		// PEUT ETRE RAJOUTER UNE SOCKET ROOM
	}
	get Game(){
		return this.game
	}
	addPlayer(socketId, isVisitor){
		if (this.game.start){
			this.game.player.push(new Player(1, socketId, true))
		}else{
			this.game.player.push(new Player(1, socketId, false))
			this.game.player[this.game.player.length -1].addPiece(this.game.piece)
		}

	}
	startGame(){
		this.game.start = true
		setInterval(() => {
			for (let i = 0; i < this.game.player.length; i++){
				this.game.player[i].goDown()
			}
		}, 10000)
	}
	getPiece(){
		this.game.piece = []
		for (let i = 0; i < 5; i++){
			this.game.piece[i] = new Piece()
		}
	}
}

// verifier cache si pas de game = 1 sinon = game .length
// let g = new Game(1, "test")
// g.addPlayer("lol")
// console.log(g.Game.player[0].player.currentPiece.piece.coord)
// console.log(g.Game)
