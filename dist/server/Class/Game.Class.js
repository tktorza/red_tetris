'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = require('./Piece.Class');
var Player = require('./Players.Class');

// const getPersonneById = (tab, id) => {
// 	let i = 0
// 	let j = 0
// 	tab.forEach( function(element, index) {
// 		if (element.player.id === id)
// 			j = i
// 		i++
// 	});
// 	return j
// }

module.exports = function () {
	function Game(id, socketId, playerName) {
		_classCallCheck(this, Game);

		this.game = { id: id, piece: [], player: [], start: false };
		this.addPiece();
		this.addFirstPlayer(socketId, playerName);
		// PEUT ETRE RAJOUTER UNE SOCKET ROOM
	}

	_createClass(Game, [{
		key: 'addPlayer',
		value: function addPlayer(socketId, playerName) {
			if (this.game.start) {
				this.game.player.push(new Player(this.game.player.length, socketId, playerName, true, false));
			} else {
				this.game.player.push(new Player(this.game.player.length, socketId, playerName, false, false));
				this.game.player[this.game.player.length - 1].addPiece(this.game.piece);
			}
		}
	}, {
		key: 'addFirstPlayer',
		value: function addFirstPlayer(socketId, playerName) {
			this.game.player.push(new Player(0, socketId, playerName, false, true));
			this.game.player[this.game.player.length - 1].addPiece(this.game.piece);
		}
	}, {
		key: 'removePlayer',
		value: function removePlayer(i) {
			// regarder si c'est le premie si oui on vire et remplace le 0
			// remplacer les id ? 
			if (i == 0 && this.game.player.length > 1) {
				this.game.player[1].player.isFirst = true;
			}
			this.game.player.splice(i, 1);
		}
	}, {
		key: 'startGame',
		value: function startGame() {
			this.game.start = true;
		}
	}, {
		key: 'restartGame',
		value: function restartGame() {
			this.game.start = false;
		}
	}, {
		key: 'addPiece',
		value: function addPiece() {
			this.game.piece = [];
			for (var i = 0; i < 5; i++) {
				this.game.piece[i] = new Piece();
			}
		}
	}, {
		key: 'Game',
		get: function get() {
			return this.game;
		}
	}]);

	return Game;
}();

// verifier cache si pas de game = 1 sinon = game .length
// let g = new Game(1, "test")
// g.addPlayer("lol")
// console.log(g.Game.player[0].player.currentPiece.piece.coord)
// console.log(g.Game)