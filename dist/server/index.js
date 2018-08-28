'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _action = require('./action.js');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logerror = (0, _debug2.default)('tetris:error'),
    loginfo = (0, _debug2.default)('tetris:info');

var initApp = function initApp(app, params, cb) {
  var host = params.host,
      port = params.port;

  var handler = function handler(req, res) {
    var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    _fs2.default.readFile(__dirname + file, function (err, data) {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  };

  app.on('request', handler);

  app.listen({ host: host, port: port }, function () {
    loginfo('tetris listen on ' + params.url);
    cb();
  });
};

var initEngine = function initEngine(io) {
  io.on('connection', function (socket) {
    loginfo("Socket connected: " + socket.id);
    _action2.default.default(socket);
  });
};

function create(params) {
  var promise = new Promise(function (resolve, reject) {
    var app = require('http').createServer();
    initApp(app, params, function () {
      global.io = require('socket.io')(app);
      var stop = function stop(cb) {
        io.close();
        app.close(function () {
          app.unref();
        });
        loginfo('Engine stopped.');
        cb();
      };

      initEngine(io);
      resolve({ stop: stop });
    });
  });
  return promise;
}