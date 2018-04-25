import React from 'react'
import { fromJS, List } from 'immutable'
import _ from 'lodash'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-addons-test-utils'
import AddUser from '../client/src/containers/AddUserContainer'
// import App from '../client/src/components/App'
// import Buttons from '../client/src/components/Buttons'
import Cell from '../client/src/components/Cell'
import JoinGame from '../client/src/components/JoinGame'
// import OtherTable from '../client/src/components/OtherTable'
import StartNewGame from '../client/src/components/StartNewGame'
// import buttonReducer from '../client/src/reducers/ButtonReducer'
// import OtherTableReducer from '../client/src/reducers/OtherTableReducer'
// import UserReducer from '../client/src/reducers/UserReducer'
import ReactTestUtils from 'react-dom/test-utils' //simulate DOM event
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

'use strict'
const chai = require('chai')
const io = require('socket.io-client')
const socketURL = 'http://localhost:9000'
let socket
const assert = require('chai').assert
const should = chai.should()
chai.use(equalJSX)


const tab = fromJS({
    id: 55,
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
describe('react JSX TESTS', function () {
    beforeEach(()=>{
        const initialState = {};
        const mockStore = configureStore();
        let wrapper;
        let store = mockStore(initialState)
        this.props = {
            data: 'val'
        }
    })
    it('Cell component', function (done) {
        const renderer = createRenderer()  
        renderer.render(<Cell tab={tab.toJS()} column={{id: 5}} currentPiece={{
            type: 1,
            coord: [
                { x: 4, y: -2 },
                { x: 5, y: -2 },
                { x: 4, y: -1 },
                { x: 5, y: -1 }
            ]
        }} endLine={[{ x: 5, y: 16 }, { x: 5, y: 17 }, { x: 5, y: 18 }, { x: 5, y: 19 }]}
        />)
        const result = renderer.getRenderOutput();
        assert.equal(result.type,'div')
        done()
    })
    it('JoinGame component', function (done) {
        const renderer = createRenderer()
        renderer.render(<JoinGame joinGame={()=>{console.log('coucou')}} room={'room1'} user={{ name: "test", id: 0, isVisitor: false }} gravity={1}/>)
        const output = renderer.getRenderOutput()
        output.should.equalJSX(
            <div className="" href="" onClick={()=>{
                joinGame(room, user, gravity)
                
            }} style={{cursor : 'pointer'}}>Join game
            </div>
        )
        done()
    })
    it('StartNewGame component', function (done) {
        const renderer = createRenderer()
        renderer.render(<StartNewGame createGame={()=>{console.log('coucou')}} room={'room1'} user={{ name: "test", id: 0, isVisitor: false }} gravity={1}/>)
        const output = renderer.getRenderOutput()
        output.should.equalJSX(
            <div className="" onClick={()=>{
                createGame(room, user, gravity)
            }} style={{cursor : 'pointer'}}>Start New Game</div>
        )
        done()
    })

    it('AddUser component', function (done) {
        const renderer = createRenderer()

        const wrapper = renderer.render(<AddUser name = {'tom'} addUser = { ()=>{console.log('coucou')} } rooms = { {} } createGame={()=>{console.log('coucou')}} playerInfo={{ name: "test", id: 0, isVisitor: false }} inGame={true} joinGame={()=>{console.log('coucou')}} gravity={1}/>)
        // expect(wrapper.is('div').toBe(true))
    })
})