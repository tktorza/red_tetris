'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JoinGame = require('./JoinGame');

var _JoinGame2 = _interopRequireDefault(_JoinGame);

var _StartNewGame = require('./StartNewGame');

var _StartNewGame2 = _interopRequireDefault(_StartNewGame);

var _ButtonContainer = require('../containers/ButtonContainer');

var _ButtonContainer2 = _interopRequireDefault(_ButtonContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ne pas oublier le pb de l'id de la room lors de la creation de la nouvelle room

var AddUser = function AddUser(props) {
  var addUser = props.addUser,
      username = props.username,
      rooms = props.rooms,
      createGame = props.createGame,
      playerInfo = props.playerInfo,
      inGame = props.inGame,
      joinGame = props.joinGame,
      gravity = props.gravity;

  var isLoggedIn = username != '' ? 1 : null;
  if (!isLoggedIn) {
    var input = void 0;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            addUser(input.value);
            input.value = '';
          } },
        _react2.default.createElement('input', { placeholder: 'Your pseudo', className: 'input-arrondi', ref: function ref(node) {
            input = node;
          } })
      ),
      _react2.default.createElement(
        'p',
        { className: 'gravity-enter' },
        'Press * keyword to reverse gravity.'
      )
    );
  } else if (!inGame) {
    return _react2.default.createElement(
      'div',
      null,
      rooms.map(function (Game) {
        return _react2.default.createElement(
          'div',
          { key: Game.game.id },
          _react2.default.createElement(
            'p',
            null,
            'id: ',
            Game.game.id,
            ' '
          ),
          _react2.default.createElement(
            'p',
            null,
            'Number of players: ',
            Game.game.player.length,
            ' '
          ),
          _react2.default.createElement(
            'p',
            null,
            'started: ',
            Game.game.start == true ? 'yes' : 'no',
            ' '
          ),
          _react2.default.createElement(_JoinGame2.default, { key: Game.game.id, room: Game.game, createGame: createGame, user: username, joinGame: joinGame, gravity: gravity })
        );
      }),
      _react2.default.createElement('br', null),
      _react2.default.createElement(_StartNewGame2.default, { room: rooms.length, user: username, createGame: createGame, gravity: gravity }),
      _react2.default.createElement(
        'div',
        { className: 'Connected-rotate' },
        _react2.default.createElement(
          'div',
          { className: 'space' },
          username
        ),
        _react2.default.createElement(
          'div',
          null,
          'Connected'
        )
      )
    );
  } else {
    return _react2.default.createElement(_ButtonContainer2.default, null);
  }
};

exports.default = AddUser;