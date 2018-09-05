'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OtherPlayerBoard = require('./OtherPlayerBoard');

var _OtherPlayerBoard2 = _interopRequireDefault(_OtherPlayerBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Cell from './Cell'

//
var OtherTable = function OtherTable(props) {
  var player = props.player;

  var line = [];
  var column = [];
  for (var x = 0; x < 10; x++) {
    column.push({ id: x });
  }
  for (var y = 0; y < 20; y++) {
    line.push({ id: y });
  }
  return _react2.default.createElement(
    'div',
    null,
    player.map(function (p) {
      return _react2.default.createElement(
        'div',
        { key: p.player.id },
        _react2.default.createElement(_OtherPlayerBoard2.default, { player: p, column: column, line: line })
      );
    })
  );
};

exports.default = OtherTable;