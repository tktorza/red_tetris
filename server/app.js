const	express = require('express'),
		app = express(),
		server = require('http').Server(app),
		path = require('path'),
		io = require('socket.io')(server)


app.use(express.static('public'));





server.listen(9000)