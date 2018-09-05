'use strict';

var Game = require('./Class/Game.Class.js');
var cache = require('memory-cache');
var RoomId = [];

exports.default = function (socket) {
	socket.on("GET_CURRENT_ROOMS", function (data) {
		var rooms = [];
		RoomId.forEach(function (element) {
			rooms.push(cache.get(element));
		});
		io.to(socket.id).emit('action', {
			type: 'GET_CURRENT_ROOMS',
			payload: rooms
		});
	});
	socket.on("RESTART_GAME", function (data) {
		var currentGame = cache.get(data.gameId);
		var piece = [];

		currentGame.addPiece();
		currentGame.game.player.forEach(function (element) {
			element.player.isLooser = false;
			element.player.isWinner = false;
			element.player.isVisitor = false;
			io.to(element.player.socketId).emit('action', {
				type: 'CREATE_GAME',
				id: data.gameId,
				isFirst: element.player.isFirst,
				playerInfo: { name: element.player.playerName, id: element.player.id, isVisitor: false, isWinner: false, isLooser: false }
			});
		});
		cache.put(data.gameId, currentGame);
		currentGame.Game.piece.forEach(function (element, index) {
			piece.push(element.piece);
		});
		io.to(data.gameId).emit('action', {
			type: 'GET_CURRENT_PIECE',
			payload: currentGame.Game.piece[0].piece
		}).emit('action', {
			type: 'RESTART'
		}).emit('action', {
			type: 'GET_NEXT_PIECE',
			payload: piece.slice(1)
		}).emit("action", {
			type: "RESTART_GAME"
		});
	});
	socket.on("SHARE_WINNER", function (data) {
		socket.broadcast.to(data.gameId).emit("action", { type: "UPDATE_PLAYER", payload: data.playerInfo });
	});
	socket.on("IS_LOOSE", function (data) {
		var currentGame = cache.get(data.gameId);
		currentGame.game.player[data.playerInfo.id].player.isLooser = true;
		var isLast = checkIfLastLooser(currentGame.game.player);
		if (isLast.i == 1 || isLast.i == 0) {
			io.to(currentGame.game.player[isLast.j].player.socketId).emit('action', { type: "END", payload: { id: currentGame.game.player[isLast.j].player.id, name: currentGame.game.player[isLast.j].player.playerName, isVisitor: currentGame.game.player[isLast.j].player.isVisitor, isLooser: false, isWinner: true } });
			socket.broadcast.to(data.gameId).emit("action", { type: "UPDATE_PLAYER", payload: { id: currentGame.game.player[isLast.j].player.id, name: currentGame.game.player[isLast.j].player.playerName, isVisitor: currentGame.game.player[isLast.j].player.isVisitor, isLooser: false, isWinner: true } });
			io.to(data.gameId).emit('action', { type: "START_GAME" });
			currentGame.restartGame();
		}
		cache.put(data.gameId, currentGame);
		if (isLast.i != 0) {
			io.to(socket.id).emit("action", { type: "END", payload: { id: currentGame.game.player[data.playerInfo.id].id, name: currentGame.game.player[data.playerInfo.id].player.playerName, isVisitor: currentGame.game.player[data.playerInfo.id].player.isVisitor, isLooser: true, isWinner: false } });
			socket.broadcast.to(data.gameId).emit("action", { type: "UPDATE_PLAYER", payload: { id: currentGame.game.player[data.playerInfo.id].player.id, name: currentGame.game.player[data.playerInfo.id].player.playerName, isVisitor: currentGame.game.player[data.playerInfo.id].player.isVisitor, isLooser: true, isWinner: false } });
		}
	});
	socket.on('CREATE_GAME', function (data) {
		startNewGame(data, socket);
		//get game id
	});
	socket.on('JOIN_GAME', function (data) {
		joinGame(data, socket);
	});
	socket.on('GET_MORE_PIECE', function (data) {
		refreshGamePiece(socket, data);
	});

	socket.on('START_GAME', function (data) {
		startGame(socket, data);
	});

	socket.on('GET_LINE', function (data) {
		io.to(socket.id).emit('action', {
			type: 'GET_LINE',
			payload: data.payload
		});
		socket.broadcast.to(data.gameId).emit('action', {
			type: 'SHARE_END_LINE',
			payload: { playerInfo: data.playerInfo, endLine: data.payload }
		});
	});

	socket.on('INIT_OTHER_TAB', function (data) {
		socket.broadcast.to(data.id).emit('action', {
			type: 'INIT_OTHER_TAB',
			payload: { player: data.playerInfo, endLine: [] }
		});
	});

	socket.on('initOtherTabForVisitor', function (data) {
		var currentGame = cache.get(data.id);
		currentGame.Game.player.forEach(function (element) {
			if (element.player.isVisitor == true) {
				io.to(element.player.socketId).emit('action', {
					type: 'INIT_OTHER_TAB',
					payload: { player: data.playerInfo, endLine: [] }
				});
			}
		});
	});

	socket.on("MALUS", function (data) {
		socket.broadcast.to(data.id).emit('action', {
			type: 'MALUS'
		});
	});

	socket.on('DISCONNECTED', function (data) {
		// revoir la logique : si qlq se deconnect mais quil y un un visituer => game restart ? ave lui en first
		var currentGame = cache.get(data.gameId);
		var j = getPlayerById(currentGame.Game.player, data.playerInfo.id);
		currentGame.removePlayer(data.playerInfo.id);
		socket.broadcast.to(data.gameId).emit('action', {
			type: 'REMOVE_USER',
			payload: data.playerInfo.id
		});
		io.to(socket.id).emit('action', {
			type: 'DISCONNECTED'
		});
		cache.put(data.gameId, currentGame);
		if (j === 0) {
			if (typeof currentGame.Game.player[0] != 'undefined') {
				io.to(currentGame.Game.player[0].player.socketId).emit('action', {
					type: "REFRESH_USER_FIRST"
				});
			} else {
				RoomId = RoomId.filter(function (elemt) {
					return elemt != data.gameId;
				});
				cache.del(data.gameId);
				// remove // updAte room from addUserContainer
			}
		} else if (typeof currentGame.Game.player[0] == 'undefined') {
			cache.del(data.gameId);
		}
	});
	socket.on('GET_USER_IN_GAME', function (data) {
		socket.broadcast.to(data.id).emit('action', {
			type: 'USER_GAME'
		});
	});
};

var checkIfLastLooser = function checkIfLastLooser(tab) {
	var i = 0;
	var j = 0;
	for (var k = 0; k < tab.length; k++) {
		if (tab[k].player.isLooser == false && tab[k].player.isVisitor == false) {
			i++;
			j = k;
		}
	}
	return { i: i, j: j };
};

var startGame = function startGame(socket, data) {
	var currentGame = cache.get(data.id);
	currentGame.startGame();
	io.to(data.id).emit('action', {
		type: "START_GAME"
	});
};

var getPersonneById = function getPersonneById(tab, playerName) {
	var i = 0;
	var j = 0;
	tab.forEach(function (element, index) {
		if (element.player.playerName.localeCompare(playerName) == 0) j = i;
		i++;
	});
	return j;
};

var getPlayerById = function getPlayerById(tab, id) {
	var i = 0;
	var j = 0;
	tab.forEach(function (element, index) {
		if (element.player.id === id) j = i;
		i++;
	});
	return j;
};

var idAvailable = function idAvailable(id) {
	if (cache.get(id) == null) {
		return id;
	}
	id += 1;
	return idAvailable(id);
};

var startNewGame = function startNewGame(data, socket) {
	var id = idAvailable(data.room);
	var piece = [];
	var currentGame = new Game(id, socket.id, data.playerName);
	var personne = getPersonneById(currentGame.Game.player, data.playerName);
	currentGame.Game.piece.forEach(function (element, index) {
		piece.push(element.piece);
	});
	socket.join(id, function () {});
	io.to(socket.id).emit('action', {
		type: 'CREATE_GAME',
		id: id,
		isFirst: true,
		playerInfo: { name: data.playerName, id: personne, isVisitor: false, isWinner: false, isLooser: false },
		currentPiece: currentGame.Game.piece[0].piece,
		nextPiece: piece.slice(1)
	});
	cache.put(id, currentGame);
	RoomId.push(id);
	// .broadcast socket..broadcast -> tt le monde sauf soit !
};

var joinGame = function joinGame(data, socket) {
	var id = data.room;
	var piece = [];
	var currentGame = cache.get(id);
	currentGame.addPlayer(socket.id, data.playerName);
	// game[i].addPlayer(socket.id, data.playerName)
	var personne = getPersonneById(currentGame.Game.player, data.playerName);
	currentGame.Game.piece.forEach(function (element, index) {
		piece.push(element.piece);
	});
	socket.join(id, function () {});
	// io.to(socket.id).emit('action', {
	// 	type : 'GET_CURRENT_PIECE',
	// 	payload : currentGame.Game.piece[0].piece
	// })
	// io.to(socket.id).emit('action', {
	// 	type : 'GET_NEXT_PIECE',
	// 	payload : piece.slice(1)
	// })
	io.to(socket.id).emit('action', {
		type: 'CREATE_GAME',
		id: id,
		isFirst: false,
		playerInfo: { name: data.playerName, id: personne, isVisitor: currentGame.Game.player[personne].player.isVisitor, isWinner: false, isLooser: false },
		currentPiece: currentGame.Game.piece[0].piece,
		nextPiece: piece.slice(1)
	});
	if (currentGame.Game.player[personne].player.isVisitor == true) {
		io.to(socket.id).emit('action', {
			type: "START_GAME"
		});
	}
};

var refreshGamePiece = function refreshGamePiece(socket, data) {
	var piece = [];
	var currentGame = cache.get(data.payload);
	currentGame.addPiece();
	currentGame.Game.piece.forEach(function (element, index) {
		piece.push(element.piece);
	});
	io.to(data.payload).emit('action', {
		type: 'GET_NEXT_PIECE',
		payload: piece
	});
};