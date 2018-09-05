'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartNewGame = function StartNewGame(props) {
    var createGame = props.createGame,
        room = props.room,
        user = props.user,
        gravity = props.gravity;

    return _react2.default.createElement(
        'div',
        { className: '', onClick: function onClick() {
                createGame(room, user, gravity);
            }, style: { cursor: 'pointer' } },
        'Start New Game'
    );
};

exports.default = StartNewGame;