'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Buttons = require('../components/Buttons');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _reactRedux = require('react-redux');

var _action = require('../actions/action');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refreshIntervalId = void 0;
var i = 0;

var isPossible = function isPossible(piece, move) {
    var endLine = _index2.default.getState().buttonReducer.toJS().endLine.slice();
    var i = 0;
    var x = void 0,
        y = void 0;

    if (endLine.length > 0) {
        switch (move) {
            case 'down':
                x = 0;
                y = 1;
                endLine.forEach(function (item) {
                    piece.coord.forEach(function (p) {
                        if (item.x == p.x && item.y == p.y + 1 || p.y === 19) i++;
                        if (p.x < 0 || p.x > 9) i++;
                    });
                });
                break;
            default:
                endLine.forEach(function (item) {
                    piece.coord.forEach(function (p) {
                        if (item.x == p.x && item.y == p.y) i++;
                        if (p.x < 0 || p.x > 9) i++;
                    });
                });
                break;

        }
    } else {
        piece.coord.forEach(function (p) {
            if (19 <= p.y) i++;
            if (p.x < 0 || p.x > 9) i++;
        });
    }
    return i;
};

var getNewPiece = function getNewPiece(dispatch) {
    var nextPiece = _index2.default.getState().buttonReducer.toJS().nextPiece.slice();
    var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
    var newPiece = nextPiece.shift();

    if (nextPiece.length == 0) {
        dispatch((0, _action.getMorePiece)(gameId));
    } else {
        dispatch((0, _action.getNextPiece)(nextPiece));
    }
    dispatch((0, _action.getCurrentPiece)(newPiece));
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        tab: state.buttonReducer.get('line'),
        column: state.buttonReducer.get('column'),
        currentPiece: state.buttonReducer.get('currentPiece'),
        endLine: state.buttonReducer.get('endLine'),
        gameId: state.buttonReducer.get('gameId'),
        gameStart: state.buttonReducer.get('gameStart'),
        nextPiece: state.buttonReducer.get('nextPiece'),
        isFirst: state.buttonReducer.get('isFirst'),
        start: state.buttonReducer.get('start'),
        playerInfo: state.buttonReducer.get('playerInfo'),
        malusLength: state.buttonReducer.get('malusLength'),
        ifUserVisitor: state.buttonReducer.get('ifUserVisitor'),
        isLooser: state.buttonReducer.get('isLooser'),
        isWinner: state.buttonReducer.get('isWinner'),
        score: state.buttonReducer.get('score')
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        createGame: function createGame(info) {
            dispatch((0, _action.createGame)(info[0], info[1]));
            for (var x = 0; x < 10; x++) {
                dispatch((0, _action.createTableX)(x));
            }
            for (var y = 0; y < 20; y++) {
                dispatch((0, _action.createTableY)(y));
            }
        },
        startMove: function startMove() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;
            dispatch((0, _action.initOtherTab)(gameId, playerInfo));
            refreshIntervalId = setInterval(function () {
                var currentPiece = Object.assign({}, _index2.default.getState().buttonReducer.toJS().currentPiece);
                var malus = _index2.default.getState().buttonReducer.toJS().malusLength;
                var newPose = { type: currentPiece.type, coord: [] };

                if (isPossible(currentPiece, 'down') === 0) {
                    currentPiece.coord.map(function (p) {
                        newPose.coord.push({ x: p.x, y: p.y + 1 });
                    });
                    dispatch((0, _action.move)(newPose));
                } else {
                    var newEndLine = _index2.default.getState().buttonReducer.toJS().endLine.slice().concat(currentPiece.coord);
                    var FinalLine = (0, _utils.getNewEndLine)(newEndLine.slice(), dispatch, gameId, malus);

                    if ((0, _utils.isLoose)(FinalLine) == true) {
                        dispatch((0, _action.getEndLine)(FinalLine, gameId, playerInfo));
                        dispatch((0, _action.loose)(gameId, playerInfo));
                        clearInterval(refreshIntervalId);
                    } else {
                        getNewPiece(dispatch);
                        dispatch((0, _action.getEndLine)(FinalLine, gameId, playerInfo));
                    }
                }
            }, 900);
        },
        startMove_2: function startMove_2() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;

            dispatch((0, _action.startGameServer)(gameId));
        },
        KeyDown: function KeyDown(key) {
            var currentPiece = Object.assign({}, _index2.default.getState().buttonReducer.toJS().currentPiece);
            var newPose = { type: currentPiece.type, coord: [] };
            var i = 0;
            var mve = "";

            if (typeof currentPiece.coord != 'undefined') {
                switch (key.key) {
                    case "ArrowLeft":
                        mve = "left";
                        currentPiece.coord.map(function (p) {
                            newPose.coord.push({ x: p.x - 1, y: p.y });
                        });
                        break;
                    case "ArrowRight":
                        mve = "right";
                        currentPiece.coord.map(function (p) {
                            newPose.coord.push({ x: p.x + 1, y: p.y });
                        });
                        break;
                    case "ArrowUp":
                        var endLine = _index2.default.getState().buttonReducer.toJS().endLine.slice();
                        mve = "up";
                        newPose = Object.assign({}, (0, _utils.calculeRotate)(currentPiece, endLine));
                        break;
                    case "ArrowDown":
                        mve = "down";
                        currentPiece.coord.map(function (p) {
                            newPose.coord.push({ x: p.x, y: p.y + 1 });
                        });
                        break;
                }
                if (isPossible(newPose, mve) === 0) {
                    dispatch((0, _action.move)(newPose));
                }
            }
        },
        SpaceDown: function SpaceDown() {
            var currentPiece = Object.assign({}, _index2.default.getState().buttonReducer.toJS().currentPiece);
            var endLine = _index2.default.getState().buttonReducer.toJS().endLine.slice();
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            var malus = _index2.default.getState().buttonReducer.toJS().malusLength;
            var FinalLine = (0, _utils.getNewEndLine)((0, _utils.calculDown)(Object.assign({}, currentPiece), endLine.slice()), dispatch, gameId, malus);
            getNewPiece(dispatch);
            dispatch((0, _action.getEndLine)(FinalLine, gameId, playerInfo));
        },
        createPiece: function createPiece() {
            var game = Object.assign({}, _index2.default.getState().buttonReducer.toJS().game);

            dispatch((0, _action.getCurrentPiece)(game.player[0].player.currentPiece.piece));
            dispatch((0, _action.getNextPiece)(game.player[0].player.nextPiece));
        },
        shareEndLine: function shareEndLine() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;
            var endLine = _index2.default.getState().buttonReducer.toJS().endLine.slice();

            dispatch((0, _action.getEndLine)(endLine, gameId, playerInfo));
        },
        disconnected: function disconnected() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;

            dispatch((0, _action.disconnected)(gameId, playerInfo));
        },
        getUserInGame: function getUserInGame() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;

            dispatch({ type: 'server/GET_USER_IN_GAME', id: gameId });
        },
        initOtherTab: function initOtherTab() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;

            dispatch((0, _action.initOtherTabForVisitor)(gameId, playerInfo));
            dispatch({ type: 'USER_GAME' });
        },
        restartGame: function restartGame() {
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            dispatch((0, _action.restartGame)(gameId));
        },
        refreshInterval: function refreshInterval() {
            var playerInfo = _index2.default.getState().buttonReducer.toJS().playerInfo;
            var gameId = _index2.default.getState().buttonReducer.toJS().gameId;
            clearInterval(refreshIntervalId);
            dispatch((0, _action.shareWinner)(gameId, playerInfo));
        }
    };
};

var BouttonContainers = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Buttons2.default);

exports.default = BouttonContainers;