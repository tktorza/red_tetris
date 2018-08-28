'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _OtherTable = require('../components/OtherTable');

var _OtherTable2 = _interopRequireDefault(_OtherTable);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
        return {
                player: state.otherTableReducer.toJS()
        };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {};
};

var OtherTableContainers = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_OtherTable2.default);

exports.default = OtherTableContainers;