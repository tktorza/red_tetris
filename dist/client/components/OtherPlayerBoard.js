'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OtherPlayerCell = require('./OtherPlayerCell');

var _OtherPlayerCell2 = _interopRequireDefault(_OtherPlayerCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OtherPlayerBoard = function OtherPlayerBoard(props) {
  var player = props.player,
      column = props.column,
      line = props.line;

  if (player.player.isLooser) return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      'LOOSER'
    ),
    _react2.default.createElement(
      'p',
      null,
      player.player.name
    )
  );else if (player.player.isWinner) return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      'WINNER'
    ),
    _react2.default.createElement(
      'p',
      null,
      player.player.name
    )
  );else {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'board', style: { display: 'flex' } },
        column.map(function (c) {
          return _react2.default.createElement(
            'div',
            { key: c.id, id: c.id },
            line.map(function (l) {
              return _react2.default.createElement(_OtherPlayerCell2.default, { key: l.id, tab: l, column: c, endLine: player.endLine });
            })
          );
        })
      ),
      _react2.default.createElement(
        'p',
        null,
        player.player.name
      )
    );
  }
};

exports.default = OtherPlayerBoard;