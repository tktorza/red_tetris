'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = require('./Game.Class');

module.exports = function () {
	function Player(id, socket, playerName, isVisitor, isFirst) {
		_classCallCheck(this, Player);

		this.player = {
			id: id,
			currentPiece: {},
			nextPiece: [],
			socketId: socket,
			isVisitor: isVisitor,
			playerName: playerName,
			isFirst: isFirst,
			isLooser: false,
			isWinnew: false
			// this.player.nextPiece = 
			// this.Player.id = GetNewPlayerId()
		};
	}

	_createClass(Player, [{
		key: 'addPiece',
		value: function addPiece(tab) {
			var _this = this;

			var i = 0;
			tab.forEach(function (item) {
				if (i == 0) {
					i++;
					_this.player.currentPiece = Object.assign({}, item);
				} else {
					_this.player.nextPiece.push(Object.assign({}, item));
				}
			});
		}
	}]);

	return Player;
}();