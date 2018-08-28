'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];

    switch (action.type) {
        case "GET_CURRENT_ROOMS":
            return tab.update('rooms', (0, _immutable.List)([]), function (rooms) {
                return rooms = action.payload;
            });
        case "IN_GAME":
            return tab.update('inGame', function (inGame) {
                return inGame = true;
            });
        case "REVERSE_GRAVITE":
            return tab.update('gravity', function (gravity) {
                return gravity = true;
            });
        case "ADD_USER":
            return tab.update('user', function (user) {
                return user = action.payload;
            });
        default:
            return tab;
    }
};

var _immutable = require('immutable');

var init = (0, _immutable.fromJS)({
    rooms: [],
    user: '',
    inGame: false,
    gravity: false
});