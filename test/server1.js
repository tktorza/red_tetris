import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers/Action'
import { createGame, joinGame, startGameServer, getMorePiece, disconnected,
          loose } from '../src/client/actions/action'
import io from 'socket.io-client'
import params from '../params'

chai.should()

describe('Server test', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))
    const socket = io(params.server.url)
    const socket2 = io(params.server.url)
    const initialState = {}

  after(function(done){ console.log("okokokkok"); tetrisServer.stop(done)})

  it('should create game', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'CREATE_GAME': () => done()
    })
    store.dispatch(createGame(0, "louis"))
  })

  it('should join game', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'CREATE_GAME': () => done()
    })
    store.dispatch(joinGame(0, "paul"))
  })
  it('should start game', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'START_GAME': () => done()
    })
    store.dispatch(startGameServer(0))
  })
  it('should return new piece', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'GET_NEXT_PIECE': () => done()
    })
    store.dispatch(getMorePiece(0))
  })
  it ('should give looser', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'END': () => done()
    })
    store.dispatch(loose(0, {name: "paul", id : 1}))
  })
    it ('should restart game', function (done){
    const store = configureStore(rootReducer, socket, initialState, {
      'CREATE_GAME' : () => done()
    })
    store.dispatch({type : "server/RESTART_GAME", gameId : 0})
  })
  //remove a laisser a la fin ?
  it('should remove first player', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'DISCONNECTED': () => done()
    })
    store.dispatch(disconnected(0, {name: "louis", id : 0}))
  })
  it ('should remove player', function(done){
    const store = configureStore(rootReducer, socket, initialState, {
      'DISCONNECTED': () => done()
    })
    store.dispatch(disconnected(0, {name: "paul", id : 1}))
  })

  
});
