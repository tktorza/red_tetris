"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var addUser = exports.addUser = function addUser(user) {
    return {
        type: 'ADD_USER',
        payload: user
    };
};

var shareWinner = exports.shareWinner = function shareWinner(gameId, playerInfo) {
    return {
        type: "server/SHARE_WINNER",
        gameId: gameId,
        playerInfo: playerInfo
    };
};

var loose = exports.loose = function loose(gameId, playerInfo) {
    return {
        type: "server/IS_LOOSE",
        gameId: gameId,
        playerInfo: playerInfo
    };
};

var restartGame = exports.restartGame = function restartGame(gameId) {
    return {
        type: "server/RESTART_GAME",
        gameId: gameId
    };
};
var joinGame = exports.joinGame = function joinGame(room, playerName) {
    return {
        type: "server/JOIN_GAME",
        room: room,
        playerName: playerName
    };
};

var inGame = exports.inGame = function inGame() {
    return {
        type: "IN_GAME"
    };
};

var getAllRooms = exports.getAllRooms = function getAllRooms() {
    return {
        type: 'server/GET_CURRENT_ROOMS'
    };
};

var getEndLine = exports.getEndLine = function getEndLine(endLine, gameId, playerInfo) {
    return {
        type: 'server/GET_LINE',
        payload: endLine,
        gameId: gameId,
        playerInfo: playerInfo
    };
};

var sendMalus = exports.sendMalus = function sendMalus(id) {
    return {
        type: 'server/MALUS',
        id: id
    };
};

var createTableX = exports.createTableX = function createTableX(id) {
    return {
        type: 'CREATE_TAB_X',
        payload: {
            id: id,
            isDone: false
        }
    };
};

var createTableY = exports.createTableY = function createTableY(id) {
    return {
        type: 'CREATE_TAB_Y',
        payload: {
            id: id,
            isDone: false
        }
    };
};

var disconnected = exports.disconnected = function disconnected(gameId, playerInfo) {
    return {
        type: 'server/DISCONNECTED',
        gameId: gameId,
        playerInfo: playerInfo
    };
};

var getCurrentPiece = exports.getCurrentPiece = function getCurrentPiece() {
    var piece = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return {
        type: 'GET_CURRENT_PIECE',
        payload: piece
    };
};

var createGame = exports.createGame = function createGame(room, playerName) {
    return {
        type: 'server/CREATE_GAME',
        room: room,
        playerName: playerName
    };
};

var getMorePiece = exports.getMorePiece = function getMorePiece(id) {
    return {
        type: 'server/GET_MORE_PIECE',
        payload: id
    };
};

var getNextPiece = exports.getNextPiece = function getNextPiece(piece) {
    return {
        type: "GET_NEXT_PIECE",
        payload: piece
    };
};

var move = exports.move = function move(piece) {
    return {
        type: 'MOVE',
        payload: piece
    };
};

var startGameServer = exports.startGameServer = function startGameServer(id) {
    return {
        type: 'server/START_GAME',
        id: id
    };
};

var initOtherTab = exports.initOtherTab = function initOtherTab(id, playerInfo) {
    return {
        type: 'server/INIT_OTHER_TAB',
        id: id,
        playerInfo: playerInfo
    };
};

var initOtherTabForVisitor = exports.initOtherTabForVisitor = function initOtherTabForVisitor(id, playerInfo) {
    return {
        type: 'server/initOtherTabForVisitor',
        id: id,
        playerInfo: playerInfo
    };
};

var upScore = exports.upScore = function upScore() {
    return {
        type: "UP_SCORE"
    };
};