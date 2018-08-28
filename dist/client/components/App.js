'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ButtonContainer = require('../containers/ButtonContainer');

var _ButtonContainer2 = _interopRequireDefault(_ButtonContainer);

var _AddUserContainer = require('../containers/AddUserContainer');

var _AddUserContainer2 = _interopRequireDefault(_AddUserContainer);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Confettii from './Confetti'
// import Boule, {tableColor} from './Boule'


var Background = function Background(props) {
  var position = props.position,
      onClick = props.onClick;

  var table = [];
  var final = 0;
  for (var i = 0; final < window.innerWidth; i++) {
    var n = Math.floor(Math.random() * 100) + 1;
    var margin = i == 0 ? 0 : Math.floor(Math.random() * 10) + 10;
    // marginTop={position == 0 ? "boule-bottom" : ""}
    table.push(React.createElement(Boule, { key: i, size: n, margin: margin }));
    final += n + margin;
  }

  return React.createElement(
    'div',
    { onClick: onClick, className: "App-center-background" },
    table
  );
};

var SpaceSky = function SpaceSky() {
  return React.createElement(
    'div',
    null,
    React.createElement('div', { className: 'stars' }),
    React.createElement('div', { className: 'twinkling' }),
    React.createElement('div', { className: 'clouds' })
  );
};

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'App-center' },
        React.createElement(_AddUserContainer2.default, { gravity: 0 })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;