import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'
import StartNewGame from '../src/client/components/StartNewGame'
import Cell from '../src/client/components/Cell'
import JoinGame from '../src/client/components/JoinGame'
import OtherTab from '../src/client/components/OtherTable'
import {fromJS, List, Map} from 'immutable'
import configureStore from 'redux-mock-store'
import OtherPlayerBoard from '../src/client/components/OtherPlayerBoard'
import OtherPlayerCell from '../src/client/components/OtherPlayerCell'

chai.should()
chai.use(equalJSX)
const assert = chai.assert
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
    it('Cell component 1', function (done) {
        const renderer = createRenderer()  
        renderer.render(<Cell tab={{id : 12}} column={{id: 5}} currentPiece={{
            type: 1,
            coord: [
                { x: 4, y: 12 },
                { x: 5, y: 12 },
                { x: 4, y: 11 },
                { x: 5, y: 11 }
            ]
        }} endLine={[{ x: 5, y: 16 }, { x: 5, y: 17 }, { x: 5, y: 18 }, { x: 5, y: 19 }]}
        />)
        const result = renderer.getRenderOutput();
        assert.equal(result.type,'div')
        done()
    })
    it('Cell component 2', function (done) {
        const renderer = createRenderer()  
        renderer.render(<Cell tab={{id : 1}} column={{id: 5}} currentPiece={{
            type: 2,
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
    it('Cell component 3', function (done) {
        const renderer = createRenderer()  
        renderer.render(<Cell tab={{id : 16}} column={{id: 5}} currentPiece={{
            type: 3,
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
    it ('OtherPlayerCell component 1', done => {
        const renderer = createRenderer()
        renderer.render(<OtherPlayerCell tab={{id : 10}} column={{id : 9}} endLine={[]} />)
        const output = renderer.getRenderOutput()
        console.log(output)
        assert.equal(output.type,'div')
        done()
    })
    it ('OtherPlayerCell component 2', done => {
        const renderer = createRenderer()
        renderer.render(<OtherPlayerCell tab={{id : 10}} column={{id : 9}} endLine={[{x : 9, y : 10}]} />)
        const output = renderer.getRenderOutput()
        console.log(output)
        assert.equal(output.type,'div')
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
            }} style={{cursor: 'pointer', padding: '2%'}}>Start New Game</div>
        )
        done()
    })
    it ('OtherTable component', done => {
        const renderer = createRenderer()
        renderer.render(<OtherTab player={[{player : { name : "lala", id : 0}}]}/>)
        const output = renderer.getRenderOutput()
        assert.equal(output.type,'div')
        done()
    })
    it ('OtherPlayerBoard component looser', done => {
        const renderer = createRenderer()
        renderer.render(<OtherPlayerBoard player={{player : { name : "lala", id : 0, isLooser: true}}}/>)
        const output = renderer.getRenderOutput()
        assert.equal(output.type,'div')
        done()
    })
    it ('OtherPlayerBoard component winner', done => {
        const renderer = createRenderer()
        renderer.render(<OtherPlayerBoard player={{player : { name : "lala", id : 0, isLooser: false, isWinner: true}}}/>)
        const output = renderer.getRenderOutput()
        assert.equal(output.type,'div')
        done()
    })

})
