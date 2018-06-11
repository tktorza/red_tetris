import React from 'react'
import { fromJS, List } from 'immutable'
import _ from 'lodash'
import buttonReducer from '../src/client/src/reducers/ButtonReducer'
import OtherTableReducer from '../src/client/src/reducers/OtherTableReducer'
import UserReducer from '../src/client/src/reducers/UserReducer'
import ReactTestUtils from 'react-dom/test-utils' //simulate DOM event
// import socketMiddleware from '../src/client/src/middleware/socketIoMiddleWare'
'use strict'
const chai = require('chai')
const io = require('socket.io-client')
const socketURL = 'http://localhost:9000'
let socket
const assert = require('chai').assert
const should = chai.should()
function clearDB() {
    for (const i in mongoose.connection.collections) {
        if (mongoose.connection.collections.hasOwnProperty(i)) {
            mongoose.connection.collections[i].remove()
        }
    }
}

const state = {

}

const initButtonReducer = fromJS({
    column: [],
    line: [],
    currentPiece: {
    },
    endLine: [{ x: 5, y: 16 }, { x: 5, y: 17 }, { x: 5, y: 18 }, { x: 5, y: 19 }],
    malusLength: 2,
    nextPiece: [
        {
            type: 1,
            coord: [
                { x: 4, y: -2 },
                { x: 5, y: -2 },
                { x: 4, y: -1 },
                { x: 5, y: -1 }
            ]
        },
        {
            type: 3,
            coord: [
                { x: 4, y: -3 },
                { x: 4, y: -2 },
                { x: 4, y: -1 },
                { x: 3, y: -1 }
            ]
        },
        {
            type: 6,
            coord: [
                { x: 5, y: -1 },
                { x: 4, y: -1 },
                { x: 4, y: -2 },
                { x: 3, y: -1 }
            ]
        }
    ],
    playerInfo: { name: "test", id: 0, isVisitor: false },
    gameId: 0,
    gameStart: false,
    isFirst: true,
    ifUserVisitor: false,
    isLooser: false,
    isWinner: false,
    score: 0
})

const buttonReducerObj= Object.assign({}, initButtonReducer)

const initotherTableReducer = List([])
    
var otherTableReducerObj = List([])

const initUserReducer = fromJS({
    rooms: [],
    user: 'test',
    inGame: true,
    gravity: false,
})

const UserReducerObj =  Object.assign({}, initUserReducer)

describe('reducer', () => {

    describe('CREATE_TAB_Y', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'CREATE_TAB_Y', payload: {
                    id: 0,
                    isDone: false
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('CREATE_TAB_X', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'CREATE_TAB_X', payload: {
                    id: 0,
                    isDone: false
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('GET_CURRENT_PIECE', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'GET_CURRENT_PIECE', payload: {
                    type: 1,
                    coord: [
                        { x: 4, y: -2 },
                        { x: 5, y: -2 },
                        { x: 4, y: -1 },
                        { x: 5, y: -1 }
                    ]
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('MOVE', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'MOVE', payload: {
                    type: 1,
                    coord: [
                        { x: 4, y: -3 },
                        { x: 5, y: -3 },
                        { x: 4, y: -1 },
                        { x: 5, y: -1 }
                    ]
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('GET_LINE', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'server/GET_LINE',
                payload: [{ x: 5, y: 16 }, { x: 5, y: 17 }, { x: 5, y: 18 }, { x: 5, y: 19 }],
                gameId: 0,
                playerInfo: { name: "test", id: 0, isVisitor: false }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('CREATE_GAME', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'server/CREATE_GAME', payload: {
                    room: 0,
                    playerName: 'arthur'
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('START_GAME', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'server/START_GAME', payload: {
                    id: 0,
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })
    describe('GET_NEXT_PIECE', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'GET_NEXT_PIECE',
                payload: {
                    type: 4,
                    coord: [
                        { x: 4, y: -2 },
                        { x: 4, y: -1 },
                        { x: 5, y: -2 },
                        { x: 3, y: -1 }
                    ]
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('MALUS', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'server/MALUS',
                payload: {
                    id: 1
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('REFRESH_USER_FIRST', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'REFRESH_USER_FIRST', payload: {

                    type: 4
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('USER_GAME', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'USER_GAME',
                payload: {
                    type: 4
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('DISCONNECTED', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'DISCONNECTED', payload: {
                    type: 4
                }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('END', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'END',
                payload: { name: "test", id: 0, isVisitor: false }
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('RESTART_GAME', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'RESTART_GAME',
                payload: {}
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('UP_SCORE', () => {

        it('should be false ', done => {
            let lol = buttonReducer(fromJS(buttonReducerObj), {
                type: 'UP_SCORE',
                payload: {}
            })
            assert.equal(false, _.isEqual(lol, initButtonReducer))
            done()
        })
    })

    describe('GET_CURRENT_ROOMS', () => {

        it('should be false ', done => {
            let lol = UserReducer(fromJS(UserReducerObj), {
                type: 'GET_CURRENT_ROOMS'
            })
            assert.equal(false, _.isEqual(lol, initUserReducer))
            done()
        })
    })
    describe('IN_GAME', () => {

        it('should be false ', done => {
            let lol = UserReducer(fromJS(UserReducerObj), {
                type: 'IN_GAME',
            })
            assert.equal(false, _.isEqual(lol, initUserReducer))
            done()
        })
    })
    describe('REVERSE_GRAVITE', () => {

        it('should be false ', done => {
            let lol = UserReducer(fromJS(UserReducerObj), {
                type: 'REVERSE_GRAVITE',
            })
            assert.equal(false, _.isEqual(lol, initUserReducer))
            done()
        })
    })
    describe('ADD_USER', () => {

        it('should be false ', done => {
            let lol = UserReducer(fromJS(UserReducerObj), {
                type: 'ADD_USER',
                payload: {
                    user: {
                        rooms: [],
                        user: 'test',
                        inGame: true,
                        gravity: false
                    }
                }
            })
            assert.equal(false, _.isEqual(lol, initUserReducer))
            done()
        })
    })
    describe('server/INIT_OTHER_TAB', () => {
        it('should be false ', done => {
            otherTableReducerObj = OtherTableReducer(fromJS(otherTableReducerObj), {
                type: 'INIT_OTHER_TAB',
                payload: { player: { name: 'test', id: 1, isVisitor: false }, endLine: [] }
            })
            assert.equal(false, _.isEqual(otherTableReducerObj, initotherTableReducer))
            done()
        })
    })
    describe('SHARE_END_LINE', () => {

        it('should be false ', done => {
            otherTableReducerObj = OtherTableReducer(fromJS(otherTableReducerObj),
                {
                    type: 'SHARE_END_LINE',
                    payload: { playerInfo: { name: 'test', id: 1, isVisitor: false }, endLine: [{ x: 5, y: 16 }, { x: 5, y: 17 }, { x: 5, y: 18 }, { x: 5, y: 19 }] }
                })
            assert.equal(false, _.isEqual(otherTableReducerObj, initotherTableReducer))
            done()
        })
    })
    describe('UPDATE_USER', () => {
        
                it('should be false ', done => {
                    const test = Object.assign({}, otherTableReducerObj.toJS())
                    otherTableReducerObj = OtherTableReducer(fromJS(otherTableReducerObj), {
                        type: 'UPDATE_USER',
                        payload: { id: 1, name: 'okok' }
                    })
                    assert.equal(false, _.isEqual(otherTableReducerObj, test))
                    done()
                })
    })
    describe('REMOVE_USER', () => {

        it('should be true ', done => {
            otherTableReducerObj = OtherTableReducer(fromJS(otherTableReducerObj), {
                type: 'REMOVE_USER',
                payload: 1
            })
            assert.equal(true, _.isEqual(otherTableReducerObj, initotherTableReducer))
            done()
        })
    })
    
    describe('RESTART', () => {

        it('should be true ', done => {
            otherTableReducerObj = OtherTableReducer(fromJS(otherTableReducerObj), {
                type: "server/RESTART_GAME",
                gameId: 0
            })
            assert.equal(true, _.isEqual(otherTableReducerObj, initotherTableReducer))
            done()
        })
    })

})