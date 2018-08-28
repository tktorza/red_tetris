'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function Cell(props) {
    var tab = props.tab,
        column = props.column,
        currentPiece = props.currentPiece,
        endLine = props.endLine;

    var color = false;
    var end = false;
    if (typeof currentPiece.coord != 'undefined') {
        currentPiece.coord.map(function (p) {
            if (tab.id === p.y && column.id == p.x) {
                color = true;
            }
        });
    }
    var backgroundPiece = "";

    switch (currentPiece.type) {
        case 1:
            backgroundPiece = "yellow";
            break;
        case 2:
            backgroundPiece = "#00FFFF";
            break;
        case 3:
            backgroundPiece = "#EEE8AA";
            break;
        case 4:
            backgroundPiece = '#CD853F';
            break;
        case 5:
            backgroundPiece = '#DDA0DD';
            break;
        case 6:
            backgroundPiece = '#66CDAA';
            break;
        case 7:
            backgroundPiece = '#FF69B4';
            break;
        case 9:
            backgroundPiece = "green";
        default:
            break;

    }
    for (var i = 0; i < endLine.length; i++) {
        if (endLine[i].y === tab.id && endLine[i].x === column.id) {
            end = true;
        }
    }
    if (end === true) {
        return _react2.default.createElement('div', { key: column.id, style: { width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'red' }, className: tab.id });
    } else if (color === true) {
        return _react2.default.createElement('div', { key: column.id, style: { width: '2em', height: '2em', border: '1px solid black', backgroundColor: backgroundPiece }, className: tab.id });
    } else {
        return _react2.default.createElement('div', { key: column.id, style: { width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'white' }, className: tab.id });
    }
};

exports.default = Cell;