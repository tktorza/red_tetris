import { getLowerCoord, getLowerDist, calculDown, isLoose, getNewEndLine, getSideBlock, getDecale, isPossible,
         calculeRotate, getNewPiece } from '../src/client/utils'
import {Map, List, fromJS} from 'immutable'

import chai from "chai"
import equalJSX from 'chai-equal-jsx'

chai.should()
chai.use(equalJSX)
const assert = chai.assert

describe('Util', () =>{

	it ('Should return lower coord', done => {
		let value = getLowerCoord([
                { x: 4, y: 12 },
                { x: 5, y: 12 },
                { x: 4, y: 11 },
                { x: 5, y: 11 }
            ])
		assert.equal(value, 12)
		done()
	})
	it ('Should return space between piece and endLIne', done => {
		let value = getLowerDist({type : 1,
			coord :[
                { x: 4, y: 12 },
                { x: 5, y: 12 },
                { x: 4, y: 11 },
                { x: 5, y: 11 }
            ]}, { x : 5, y : 18}, 7)
		assert.equal(value, 5)
		done()
	})
	it ('Should return new endLine', done => {
		let value = calculDown({type : 1,
			coord :[
                { x: 4, y: 12 },
                { x: 5, y: 12 },
                { x: 4, y: 11 },
                { x: 5, y: 11 }
            ]},
            [{x : 1, y : 19},{x : 2, y : 19},{x : 1, y : 18},{x : 2, y : 18}])
		assert.equal(value.length, 8)
		done()
	})
	it ('Should loose', done => {
		let value = isLoose([{x : 1, y : 2},{x : 0, y :-1}])
		assert.equal(value, true)
		done()
	})
	it ('Should win', done => {
		let value = isLoose([{x : 1, y : 2},{x : 0, y :4}])

		assert.equal(value, false)
		done()
	})
	it ('Should return new endLine 1', done => {
		let value = getNewEndLine([{x : 1, y : 19},{x : 2, y : 19},{x : 1, y : 18},{x : 2, y : 18}], console.log(), 0, 0)
		assert.equal(value.length, 4)
		done()
	})
	it ('Should return new endLine 2', done => {
		let value = getNewEndLine([{x : 1, y : 19},{x : 2, y : 19},{x : 1, y : 18},{x : 2, y : 18}],()=>{ }, 0, 2)
		assert.equal(value.length, 4)
		done()
	})
	it ('Should remove line from new endLine 3', done => {
		let value = getNewEndLine([{x : 0, y : 19}, {x : 1, y : 19},{x : 2, y : 19},{x : 3, y : 19},{x : 4, y : 19},{x : 5, y : 19}, {x : 6, y : 19}, {x : 7, y : 19}, {x : 8, y : 19}, {x : 6, y : 19}], () => {}, 0, 0)
		assert.equal(value.length, 0)
		done()
	})
	it ('Should remove line and done piece', done => {
		let value = getNewEndLine([{x : 0, y : 18}, {x : 0, y : 19}, {x : 1, y : 19},{x : 2, y : 19},{x : 3, y : 19},{x : 4, y : 19},{x : 5, y : 19}, {x : 6, y : 19}, {x : 7, y : 19}, {x : 8, y : 19}, {x : 6, y : 19}], () => {}, 0, 0)
		assert.equal(value.length, 1)
		done()
	})
	it ('Should give the x pos if blcok aside piece', done => {
		let value = getSideBlock({x : 1, y : 5}, [{x : 0, y : 5}], 1)
		assert.equal(value, 0)
		done()
	})
	it ('Should give the x pos if blcok aside piece 2', done => {
		let value = getSideBlock({x : 8, y : 5}, [{x : 9, y : 5}], 1)
		assert.equal(value, 9)
		done()
	})
	it ('Should give the x pos if blcok aside piece 3', done => {
		let value = getSideBlock({x : 7, y : 5}, [{x : 9, y : 5}], 7)
		assert.equal(value, 9)
		done()
	})
	it ('Should give the x pos if blcok aside piece 4', done => {
		let value = getSideBlock({x : 2, y : 5}, [{x : 0, y : 5}], 7)
		assert.equal(value, 0)
		done()
	})
	it ('Should return piece offset', done => {
		let value = getDecale({type : 1, coord : [{x : 2, y : 5} ,{x : 0, y : 5}]}, [])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 2', done => {
		let value = getDecale({type : 1, coord : [{x : 2, y : 5} ,{x : 9, y : 5}]}, [])
		assert.equal(value, -1)
		done()
	})
	it ('Should return piece offset 3', done => {
		let value = getDecale({type : 1, coord : [{x : 2, y : 5} ,{x : 2, y : 6}, {x : 3, y : 6}, {x : 4, y : 6}]}, [{x : 1, y : 5}, {x : 1, y : 6}])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 4', done => {
		let value = getDecale({type : 1, coord : [{x : 12, y : 5} ,{x : 12, y : 6}, {x : 13, y : 6}, {x : 14, y : 6}]}, [{x : 13, y : 5}, {x : 13, y : 6}])
		assert.equal(value, -1)
		done()
	})
	it ('Should return piece offset 5', done => {
		let value = getDecale({type : 7, coord : [{x : 2, y : 5} ,{x : 2, y : 6}, {x : 2, y : 7}, {x : 2, y : 8}]}, [{x : 1, y : 5}, {x : 1, y : 6}])
		assert.equal(value, 2)
		done()
	})
	it ('Should return piece offset 6', done => {
		let value = getDecale({type : 7, coord : [{x : 0, y : 5} ,{x : 0, y : 6}, {x :0, y : 7}, {x : 0, y : 8}]}, [])
		assert.equal(value, 2)
		done()
	})
	it ('Should return piece offset 7', done => {
		let value = getDecale({type : 7, coord : [{x : 0, y : 7} ,{x : 0, y : 6}, {x :0, y : 5}, {x : 0, y : 8}]}, [])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 8', done => {
		let value = getDecale({type : 7, coord : [{x : 1, y : 5} ,{x : 1, y : 6}, {x :1, y : 7}, {x : 1, y : 8}]}, [])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 9', done => {
		let value = getDecale({type : 7, coord : [{x : 9, y : 5} ,{x : 9, y : 6}, {x :9, y : 7}, {x : 9, y : 8}]}, [])
		assert.equal(value, -1)
		done()
	})
	it ('Should return piece offset 10', done => {
		let value = getDecale({type : 7, coord : [{x : 9, y : 7} ,{x : 9, y : 6}, {x :9, y : 5}, {x : 9, y : 8}]}, [])
		assert.equal(value, -2)
		done()
	})
	it ('Should return piece offset 11', done => {
		let value = getDecale({type : 7, coord : [{x : 8, y : 7} ,{x : 8, y : 6}, {x :8, y : 5}, {x : 8, y : 8}]}, [])
		assert.equal(value, -1)
		done()
	})
	it ('Should return piece offset 12', done => {
		let value = getDecale({type : 7, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, [{x : 4, y : 5}, {x : 4, y : 6}, {x : 4, y : 7}, {x : 4, y : 8}])
		assert.equal(value, 2)
		done()
	})
	it ('Should return piece offset 13', done => {
		let value = getDecale({type : 7, coord : [{x : 5, y : 7} ,{x : 5, y : 6}, {x :5, y : 5}, {x : 5, y : 8}]}, [{x : 4, y : 5}, {x : 4, y : 6}, {x : 4, y : 7}, {x : 4, y : 8}])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 14', done => {
		let value = getDecale({type : 7, coord : [{x : 6, y : 5} ,{x : 6, y : 6}, {x :6, y : 7}, {x : 6, y : 8}]}, [{x : 4, y : 5}, {x : 4, y : 6}, {x : 4, y : 7}, {x : 4, y : 8}])
		assert.equal(value, 1)
		done()
	})
	it ('Should return piece offset 15', done => {
		let value = getDecale({type : 7, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, [{x : 6, y : 5}, {x : 6, y : 6}, {x : 6, y : 7}, {x : 6, y : 8}])
		assert.equal(value, -1)
		done()
	})
	it ('Should return piece offset 16', done => {
		let value = getDecale({type : 7, coord : [{x : 5, y : 7} ,{x : 5, y : 6}, {x :5, y : 5}, {x : 5, y : 8}]}, [{x : 6, y : 5}, {x : 6, y : 6}, {x : 6, y : 7}, {x : 6, y : 8}])
		assert.equal(value, -2)
		done()
	})
	it ('Should return piece offset 15', done => {
		let value = getDecale({type : 7, coord : [{x : 4, y : 7} ,{x : 4, y : 6}, {x :4, y : 5}, {x : 4, y : 8}]}, [{x : 6, y : 5}, {x : 6, y : 6}, {x : 6, y : 7}, {x : 6, y : 8}])
		assert.equal(value, -1)
		done()
	})
	it ('Should return coord after rotate', done => {
		let value = calculeRotate({type : 7, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, [])
		assert.equal(typeof(value), "object")
		done()
	})
	it ('Should return coord after rotate', done => {
		let value = calculeRotate({type : 1, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, [])
		assert.equal(typeof(value), "object")
		done()
	})
	it ('Should return if is possible or not', done => {
		let value = isPossible({type : 1, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, "down", [])	
		assert.equal(value, 0)
		done()
	})
	it ('Should return if is possible or not', done => {
		let value = isPossible({type : 1, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, "down", [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}])	
		assert.equal(value, 3)
		done()
	})
	it ('Should return if is possible or not', done => {
		let value = isPossible({type : 1, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}, "left", [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}])	
		assert.equal(value, 4)
		done()
	})
	it ('Should dispatch get new piece if need', done => {
		
		let value = getNewPiece(0, [{type : 1, coord : [{x : 5, y : 5} ,{x : 5, y : 6}, {x :5, y : 7}, {x : 5, y : 8}]}], () => {return 1})	
		console.log(value)
		assert.equal(typeof(value), 'undefined')
		done()
	})
})