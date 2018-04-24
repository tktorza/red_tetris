
import React from 'react'
import chai from "chai"
import {fromJS} from 'immutable'
import _ from 'lodash'
import ReactTestUtils from 'react-addons-test-utils' //simulate DOM event
import socketIoMiddleWare from '../src/client/middleware/socketIoMiddleWare'
import io from 'socket.io-client'
'use strict'
const chai = require('chai')
const io = require('socket.io-client')
const socketURL = 'http://localhost:9000'
let socket
const assert = require('chai').assert
const should = chai.should()

const state = {

}