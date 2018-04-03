const Piece = require('./Piece.Class')
const Player = require('./Players.Class')

const getPersonneById = (tab, id) => {
	let i = 0
	let j = 0
	tab.forEach( function(element, index) {
		if (element.player.id === id)
			j = i
		i++
	});
	return j
}

module.exports = class Game {
	constructor(id, socketId, playerName){
		this.game = {id : id, piece : [], player : [], start: false}
		this.addPiece()
		this.addFirstPlayer(socketId, playerName)
		// PEUT ETRE RAJOUTER UNE SOCKET ROOM
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
	removePlayer(playerId){
		// regarder si c'est le premie si oui on vire et remplace le 0
		// remplacer les id ? 
		let i = getPersonneById(this.game.player, playerId)
		this.game.player.splice(i, 1)
	}
	startGame(){
		this.game.start = true
	}
	addPiece(){
		this.game.piece = []
		for (let i = 0; i < 5; i++){
			this.game.piece[i] =  new Piece()
		}
	}
}

// verifier cache si pas de game = 1 sinon = game .length
// let g = new Game(1, "test")
// g.addPlayer("lol")
// console.log(g.Game.player[0].player.currentPiece.piece.coord)
// console.log(g.Game)
