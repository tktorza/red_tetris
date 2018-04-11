'use strict'
const chai = require('chai')
const io = require('socket.io-client')
const socketURL = 'http://localhost:9000'
let socket
const assert = require('chai').assert
const should = chai.should()

describe('Socket', () => {
	beforeEach(done => {
	socket = io.connect(socketURL)
		socket.on('connect', () => {
			done()
		})
	})


	describe('Socket : create a Player', ()=> {
		after((done) => {
			if (socket.connected) socket.disconnect()
			done()
		})
		it ('should be return Game Id and PlayerName', done => {
			socket.on('action', (res) => {
				switch (res.type) {
					case "CREATE_GAME":
						assert.equal(res.playerInfo.name, "Louis")
						assert.equal(res.id, 0)
						done()
						// statements_1
						break;
				}
			})
			socket.emit('CREATE_GAME', {room : 0, playerName : "Louis"})
		})
	})
	describe('Socket : create fisrt current piece', ()=> {
		after((done) => {
			if (socket.connected) socket.disconnect()
			done()
		})
		it ('should be return object with array of coord', done => {
			socket.on('action', (res) => {
				switch (res.type) {
					case "GET_CURRENT_PIECE":
						assert.equal(res.payload.coord.length, 4)
						done()
						// statements_1
						break;
				}
			})
			socket.emit('CREATE_GAME', {room : 1, playerName : "Louis"})
		})
	})
	describe('Socket : create next piece array', () => {
		it ('shoulde be return array of object', done => {
			socket.on('action', (res) => {
				switch (res.type) {
					case "GET_NEXT_PIECE":
						assert.equal(res.payload.length, 4)
						assert.equal(res.payload[0].coord.length, 4)
						assert.equal(res.payload[1].coord.length, 4)
						assert.equal(res.payload[2].coord.length, 4)
						assert.equal(res.payload[3].coord.length, 4)
						done()
						// statements_1
						break;
				}
			})
			socket.emit('CREATE_GAME', {room : 1, playerName : "Louis"})
		})
	})
})
