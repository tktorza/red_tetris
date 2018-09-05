'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _ButtonReducer = require('./ButtonReducer');

var _ButtonReducer2 = _interopRequireDefault(_ButtonReducer);

var _OtherTableReducer = require('./OtherTableReducer');

var _OtherTableReducer2 = _interopRequireDefault(_OtherTableReducer);

var _UserReducer = require('./UserReducer');

var _UserReducer2 = _interopRequireDefault(_UserReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  buttonReducer: _ButtonReducer2.default,
  otherTableReducer: _OtherTableReducer2.default,
  UserReducer: _UserReducer2.default
});