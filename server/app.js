const	express = require('express'),
		app = express(),
		server = require('http').Server(app),
		path = require('path'),
		io = require('socket.io')(server)


app.use(express.static('public'));




io.on('connection', (socket) => {
	console.log("la")
	console.log(socket.id)
	socket.on('test', (la) => {
		socket.emit('ok', la)
	})
})

server.listen(9000)