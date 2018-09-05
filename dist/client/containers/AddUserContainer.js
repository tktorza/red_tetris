'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AddUser = require('../components/AddUser');

var _AddUser2 = _interopRequireDefault(_AddUser);

var _reactRedux = require('react-redux');

var _action = require('../actions/action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return {
        username: state.UserReducer.get('user'),
        rooms: state.UserReducer.get('rooms'),
        playerInfo: state.buttonReducer.get('playerInfo'),
        inGame: state.UserReducer.get('inGame')
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addUser: function addUser(user) {
            dispatch((0, _action.addUser)(user));
            dispatch((0, _action.getAllRooms)());
        },
        createGame: function createGame(game, user, gravity) {
            dispatch((0, _action.inGame)());
            dispatch((0, _action.createGame)(game, user));
            for (var x = 0; x < 10; x++) {
                dispatch((0, _action.createTableX)(x));
            }
            if (gravity == 1) {
                for (var y = 0; y < 20; y++) {
                    dispatch((0, _action.createTableY)(y));
                }
            } else {
                for (var _y = 19; _y >= 0; _y--) {
                    dispatch((0, _action.createTableY)(_y));
                }
            }
        },
        joinGame: function joinGame(game, user, gravity) {
            dispatch((0, _action.inGame)());
            dispatch((0, _action.joinGame)(game, user));
            for (var x = 0; x < 10; x++) {
                dispatch((0, _action.createTableX)(x));
            }
            if (gravity == 1) {
                for (var y = 0; y < 20; y++) {
                    dispatch((0, _action.createTableY)(y));
                }
            } else {
                for (var _y2 = 19; _y2 >= 0; _y2--) {
                    dispatch((0, _action.createTableY)(_y2));
                }
            }
        }
    };
};

var AddUserContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_AddUser2.default);

exports.default = AddUserContainer;