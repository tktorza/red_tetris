'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];

    switch (action.type) {
        case "SHARE_END_LINE":
            return tab.update(function (t) {
                return t.map(function (p) {
                    if (p.get('player').id === action.payload.playerInfo.id) {
                        return p.set("endLine", action.payload.endLine);
                    } else {
                        return p;
                    }
                });
            });
        case "REMOVE_USER":
            return tab.update(function (t) {
                return t.filter(function (player) {
                    return player.get('player').id != action.payload;
                });
            });
        case "UPDATE_PLAYER":
            return tab.update(function (t) {
                return t.map(function (p) {
                    if (p.get('player').id === action.payload.id) {
                        return p.set('player', action.payload);
                    } else {
                        return p;
                    }
                });
            });
        case "RESTART":
            return init;
        case "INIT_OTHER_TAB":
            return tab.push((0, _immutable.Map)(action.payload));
        default:
            return tab;
    }
};

var _immutable = require('immutable');

var init = (0, _immutable.List)([]);