'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var socketMiddleware = function socketMiddleware(socket) {
	return function (_ref) {
		var dispatch = _ref.dispatch,
		    getState = _ref.getState;

		if (socket) {

			socket.on('action', dispatch);
		}
		return function (next) {
			return function (action) {
				if (socket && action.type && action.type.indexOf('server/') === 0) {
					var serverAction = action.type.split('/')[1];
					socket.emit(serverAction, action);
				}
				return next(action);
			};
		};
	};
};

exports.default = socketMiddleware;