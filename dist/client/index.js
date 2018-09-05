'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Action = require('./reducers/Action');

var _Action2 = _interopRequireDefault(_Action);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _socketMiddleware = require('./middleware/socketMiddleware');

var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

var _redux = require('redux');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = (0, _socket2.default)('http://0.0.0.0:3004');

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// registerServiceWorker();

// import { createStore } from 'redux'
var store = (0, _redux.createStore)(_Action2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _socketMiddleware2.default)(io)));

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
), document.getElementById('tetris'));

exports.default = store;