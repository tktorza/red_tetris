'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OtherPlayerCell = function OtherPlayerCell(props) {
    var tab = props.tab,
        column = props.column,
        endLine = props.endLine;

    var test = [];
    var end = false;
    for (var i = 0; i < endLine.length; i++) {
        if (endLine[i].y === tab.id && endLine[i].x === column.id) {
            end = true;
        }
    }
    if (end === true) {
        return _react2.default.createElement('div', { key: column.id, style: { width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'red' }, className: tab.id });
    } else {
        return _react2.default.createElement('div', { key: column.id, style: { width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'white' }, className: tab.id });
    }
    // return test
};

exports.default = OtherPlayerCell;