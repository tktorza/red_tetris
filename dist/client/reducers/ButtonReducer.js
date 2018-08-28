'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];

    switch (action.type) {
        case "CREATE_TAB_Y":
            return tab.update('line', (0, _immutable.List)([]), function (line) {
                return line.push((0, _immutable.Map)(action.payload));
            });
        case "CREATE_TAB_X":
            return tab.update('column', (0, _immutable.List)([]), function (column) {
                return column.push((0, _immutable.Map)(action.payload));
            });
        case "GET_CURRENT_PIECE":
            return tab.update('currentPiece', (0, _immutable.List)([]), function (currentPiece) {
                return currentPiece = action.payload;
            });
        case "MOVE":
            return tab.update('currentPiece', (0, _immutable.List)([]), function (currentPiece) {
                return currentPiece = action.payload;
            });
        case "GET_LINE":
            return tab.update('endLine', (0, _immutable.List)([]), function (endLine) {
                return endLine = action.payload;
            });
        case "CREATE_GAME":
            return tab.update('gameId', function (gameId) {
                return gameId = action.id;
            }).update('isFirst', function (isFirst) {
                return isFirst = action.isFirst;
            }).update('playerInfo', (0, _immutable.List)([]), function (playerInfo) {
                return playerInfo = action.playerInfo;
            }).update('nextPiece', (0, _immutable.List)([]), function (nextPiece) {
                return nextPiece = action.nextPiece;
            }).update('currentPiece', (0, _immutable.List)([]), function (currentPiece) {
                return currentPiece = action.currentPiece;
            });
        case "START_GAME":
            return tab.update('gameStart', function (gameStart) {
                return gameStart = !gameStart;
            });
        case "GET_NEXT_PIECE":
            return tab.update('nextPiece', (0, _immutable.List)([]), function (nextPiece) {
                return nextPiece = action.payload;
            });
        case "MALUS":
            return tab.update('endLine', (0, _immutable.List)([]), function (endLine) {
                return endLine.map(function (e) {
                    return { x: e.x, y: e.y - 1 };
                });
            }).update('endLine', (0, _immutable.List)([]), function (endLine) {
                return endLine.concat(addEnd);
            }).update('malusLength', function (malusLength) {
                return malusLength += 1;
            });
        case "REFRESH_USER_FIRST":
            return tab.update('isFirst', function (isFirst) {
                return isFirst = true;
            });
        case "USER_GAME":
            return tab.update('ifUserVisitor', function (ifUserVisitor) {
                return ifUserVisitor = !ifUserVisitor;
            });
        case "DISCONNECTED":
            return init;
        case "END":
            return tab.update('playerInfo', (0, _immutable.List)([]), function (playerInfo) {
                return playerInfo = action.payload;
            });
        case "RESTART_GAME":
            return tab.update('endLine', (0, _immutable.List)([]), function (endLine) {
                return endLine = [];
            }).update('score', function (score) {
                return score = 0;
            });
        case "UP_SCORE":
            return tab.update('score', function (score) {
                return score += 10;
            });
        default:
            return tab;
    }
};

var _immutable = require('immutable');

var init = (0, _immutable.fromJS)({
    column: [],
    line: [],
    currentPiece: [],
    endLine: [],
    malusLength: 0,
    nextPiece: [],
    playerInfo: {},
    gameId: 0,
    gameStart: false,
    isFirst: false,
    ifUserVisitor: false,
    isLooser: false,
    isWinner: false,
    score: 0
});

var addEnd = [{ x: 0, y: 19 }, { x: 1, y: 19 }, { x: 2, y: 19 }, { x: 3, y: 19 }, { x: 4, y: 19 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }, { x: 8, y: 19 }, { x: 9, y: 19 }];