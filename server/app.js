const	express = require('express'),
		app = express(),
		server = require('http').Server(app),
		path = require('path'),
		action = require('./action.js')/*,
		MongoClient = require('mongodb').MongoClient,
		url = "mongodb://localhost:27017/mongodb"*/

global.io = require('socket.io')(server)

app.use(express.static('public'));


/*MongoClient.connect(url, function(err, db) {

});
*/

io.on('connection', (socket) => {
	console.log("connection socket")
	// console.log(socket.id)
	action.default(socket)
	
})

server.listen(9000)