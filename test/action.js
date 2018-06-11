import { addUser, shareWinner, loose, restartGame, joinGame, inGame, getAllRooms, getEndLine, sendMalus, createTableX, createTableY, disconnected, getCurrentPiece, createGame, getMorePiece, getNextPiece, move, startGameServer, initOtherTab, initOtherTabForVisitor, upScore } from '../src/client/src/action/action'
'use strict'
import _ from 'lodash'
const chai = require('chai')
const assert = require('chai').assert
const should = chai.should()
const user = {}


describe('Front-end', () => {

    describe('Action', () => {
        it('should be true when addUser\'s action is test', done => {
            const lol = addUser('test')
            assert.equal(true, _.isEqual(lol, { type: 'ADD_USER', payload: 'test' }))
            done()
        })
        it('should be true when shareWinner\'s action is test', done => {
            const lol = shareWinner(1, { user: 'okok', cool: true })
            assert.equal(true, _.isEqual(lol, { type: 'server/SHARE_WINNER', gameId: 1, playerInfo: { user: 'okok', cool: true } }))
            done()
        })

        it('should be true when loose\'s action is test', done => {
            const lol = loose(1, { user: 'okok', cool: true })
            assert.equal(true, _.isEqual(lol, { type: 'server/IS_LOOSE', gameId: 1, playerInfo: { user: 'okok', cool: true } }))
            done()
        })
        it('should be true when joinGame\'s action is test', done => {
            const lol = restartGame(1234)
            assert.equal(true, _.isEqual(lol, {type : "server/RESTART_GAME",
            gameId : 1234 }))
            done()
        })
        it('should be true when restartGame\'s action is test', done => {
            const lol = joinGame({}, 'test')
            assert.equal(true, _.isEqual(lol, {   type : "server/JOIN_GAME",
            room : {},
            playerName : 'test' }))
            done()
        })
        it('should be true when inGame\'s action is test', done => {
            const lol = inGame()
            assert.equal(true, _.isEqual(lol, { type : "IN_GAME" }))
            done()
        })

        it('should be true when getAllRooms\'s action is test', done => {
            const lol = getAllRooms()
            assert.equal(true, _.isEqual(lol, { type : 'server/GET_CURRENT_ROOMS' }))
            done()
        })
        it('should be true when sendMalus\'s action is test', done => {
            const lol = sendMalus(1234)
            assert.equal(true, _.isEqual(lol, {  type: 'server/MALUS',
            id : 1234 }))
            done()
        })
        it('should be true when createTableX\'s action is test', done => {
            const lol = createTableX(1234)
            assert.equal(true, _.isEqual(lol, {  type : 'CREATE_TAB_X',
            payload : {
                id : 1234,
                isDone : false
            } }))
            done()
        })
        it('should be true when creataTableY\'s action is test', done => {
            const lol = createTableY(1234)
            assert.equal(true, _.isEqual(lol, {  type : 'CREATE_TAB_Y',
            payload : {
                id : 1234,
                isDone : false
            } }))
            done()
        })
        it('should be true when disconnected\'s action is test', done => {
            const lol = disconnected(1234, {})
            assert.equal(true, _.isEqual(lol, {     type : 'server/DISCONNECTED',
            gameId : 1234,
            playerInfo : {} }))
            done()
        })
        it('should be true when getCurrentPiece\'s action is test', done => {
            const lol = getCurrentPiece([])
            assert.equal(true, _.isEqual(lol, {	type : 'GET_CURRENT_PIECE',
            payload : []}))
            done()
        })
        it('should be true when createGame\'s action is test', done => {
            const lol = createGame({}, 'test')
            assert.equal(true, _.isEqual(lol, {      type : 'server/CREATE_GAME',
            room : {},
            playerName : 'test' }))
            done()
        })
        it('should be true when getMorePiece\'s action is test', done => {
            const lol = getMorePiece(1234)
            assert.equal(true, _.isEqual(lol, {       type : 'server/GET_MORE_PIECE',
            payload : 1234 }))
            done()
        })
        it('should be true when getNextPiece\'s action is test', done => {
            const lol = getNextPiece([])
            assert.equal(true, _.isEqual(lol, {    type : "GET_NEXT_PIECE",
            payload : [] }))
            done()
        })
        it('should be true when move\'s action is test', done => {
            const lol = move([])
            assert.equal(true, _.isEqual(lol, {	type : 'MOVE',
            payload : [] }))
            done()
        })
        it('should be true when startGameServer\'s action is test', done => {
            const lol = startGameServer(1234)
            assert.equal(true, _.isEqual(lol, {      type : 'server/START_GAME',
            id : 1234 }))
            done()
        })
        it('should be true when initOtherTab\'s action is test', done => {
            const lol = initOtherTab(1234, {name: 'test'})
            assert.equal(true, _.isEqual(lol, {        type : 'server/INIT_OTHER_TAB',
            id : 1234,
            playerInfo : {name: 'test'} }))
            done()
        })
        it('should be true when initOtherTabForVisitor\'s action is test', done => {
            const lol = initOtherTabForVisitor(1234, {user: 'test'})
            assert.equal(true, _.isEqual(lol, {       type : 'server/initOtherTabForVisitor',
            id : 1234,
            playerInfo : {user: 'test'} }))
            done()
        })
        it('should be true when upScore\'s action    is test', done => {
            const lol = upScore()
            assert.equal(true, _.isEqual(lol, { type : "UP_SCORE" }))
            done()
        })
    })
})