const Piece = require('./Piece.Class')
const Player = require('./Players.Class')
class Game {
	constructor(id, socketId){
		this.game = {id : id, piece : [], player : []}
		for (let i = 0; i < 10; i++){
			this.game.piece[i] = new Piece()
		}
		this.addPlayer(socketId)
	}
	get Game(){
		return this.game
	}
	addPlayer(socketId){
		this.game.player.push(new Player(/*get id player(i)*/ 1, socketId))
		this.game.player[this.game.player.length -1].addPiece(this.game.piece)
	}
	// addPlayer(){

	// }
}

// verifier cache si pas de game = 1 sinon = game .length
let g = new Game(1, "test")
g.addPlayer("lol")
console.log(g.Game.player)
// console.log(g.Game)
