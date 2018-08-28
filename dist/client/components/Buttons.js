'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactFunctionalLifecycle = require('react-functional-lifecycle');

var _reactFunctionalLifecycle2 = _interopRequireDefault(_reactFunctionalLifecycle);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _OtherTabContainer = require('../containers/OtherTabContainer');

var _OtherTabContainer2 = _interopRequireDefault(_OtherTabContainer);

var _reactPureLifecycle = require('react-pure-lifecycle');

var _reactPureLifecycle2 = _interopRequireDefault(_reactPureLifecycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
    var restartGame = props.restartGame,
        score = props.score,
        tab = props.tab,
        column = props.column,
        SpaceDown = props.SpaceDown,
        currentPiece = props.currentPiece,
        startMove = props.startMove,
        KeyDown = props.KeyDown,
        endLine = props.endLine,
        gameStart = props.gameStart,
        isFirst = props.isFirst,
        startMove_2 = props.startMove_2,
        disconnected = props.disconnected,
        playerInfo = props.playerInfo;

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        switch (evt.key) {
            case "ArrowRight":
                KeyDown(evt);
                break;
            case "ArrowLeft":
                KeyDown(evt);
                break;
            case "ArrowUp":
                KeyDown(evt);
                break;
            case "ArrowDown":
                KeyDown(evt);
                break;
            case " ":
                SpaceDown();
                break;
        }
    };
    var start = function start() {
        return function (event) {
            startMove_2();
        };
    };
    var Restart = function Restart() {
        return function (event) {
            restartGame();
        };
    };
    var visib_2 = void 0;
    if (gameStart == false && isFirst) visib_2 = "visible";else {
        visib_2 = 'hidden';
    }
    window.onbeforeunload = function (e) {
        disconnected();
    };
    if (playerInfo.isVisitor == true) {
        return _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            _react2.default.createElement(_OtherTabContainer2.default, null)
        );
    } else if (playerInfo.isWinner == true) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { style: { display: 'flex', justifyContent: 'space-between', zIndex: '1', position: 'relative' } },
                _react2.default.createElement(
                    'div',
                    null,
                    'WINNER'
                ),
                _react2.default.createElement(_OtherTabContainer2.default, null),
                _react2.default.createElement(
                    'button',
                    { style: { visibility: visib_2 }, onClick: Restart() },
                    'RestartGame'
                )
            )
        );
    } else if (playerInfo.isLooser == false) {
        return _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            _react2.default.createElement(
                'button',
                { onClick: start(), style: { visibility: visib_2 } },
                'Start'
            ),
            _react2.default.createElement(
                'div',
                { className: 'board', style: { display: 'flex' } },
                column.map(function (c) {
                    return _react2.default.createElement(
                        'div',
                        { key: c.get('id'), id: c.get('id') },
                        tab.map(function (t) {
                            return _react2.default.createElement(_Cell2.default, { key: t.get('id') + ' ' + c.get('id'), tab: t.toJS(), column: c.toJS(), currentPiece: currentPiece, endLine: endLine });
                        })
                    );
                })
            ),
            _react2.default.createElement(
                'div',
                null,
                score
            ),
            _react2.default.createElement(_OtherTabContainer2.default, null)
        );
    } else {
        return _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            _react2.default.createElement(
                'div',
                null,
                'LOOSER'
            ),
            _react2.default.createElement(_OtherTabContainer2.default, null),
            _react2.default.createElement(
                'button',
                { style: { visibility: visib_2 }, onClick: Restart() },
                'RestartGame'
            )
        );
    }
};
//
// export default functional(Button, {

// import Confetti from './Confetti'
var methods = {
    componentWillMount: function componentWillMount(props) {
        // if (typeof(props.playerInfo.name) == 'undefined'){
        //     let infoParti = window.location.href.split('/')
        //     if (infoParti.length == 4){
        //         let info = infoParti[3].replace('#', '').replace(/]/gi, '').split('[')
        //         if (info.length == 2)
        //            props.nfo)
        //     }
        // } 
    },

    shouldComponentUpdate: function shouldComponentUpdate(props, nextProps) {
        if (props.gameStart == false && nextProps.gameStart == true && nextProps.playerInfo.isVisitor == false) props.startMove();
        if (typeof props.playerInfo.isVisitor == 'undefined' && typeof nextProps.playerInfo.isVisitor == 'boolean' && nextProps.playerInfo.isVisitor) {
            // envoyer au server que l'on rejoin le game et qu'il envoit au autre client de partager les endLine 
            props.getUserInGame();
        }
        if (props.ifUserVisitor == false && nextProps.ifUserVisitor === true) {
            props.initOtherTab();
        }
        if (props.malusLength < nextProps.malusLength) {
            props.shareEndLine();
        }
        if (props.playerInfo.isWinner == false && nextProps.playerInfo.isWinner == true) {
            props.refreshInterval();
        }
        return true;
    }
};

exports.default = (0, _reactPureLifecycle2.default)(methods)(Button);
// });