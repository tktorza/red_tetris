import addUser from '../actions'
import socket from 'socket.io-client'

const io = socket('http://localhost:9000')

const socketMiddleware = ({dispatch, getState}) => {
	// console.log("la")
	return next => action => {
		// console.log("iokokokok ")
		// console.log(action)
		// console.log(getState)
		switch(action.type){
			case 'ADD_USER' :
				io.emit('test', action)
				io.on('ok', data => { next(action)})
			default :
				return next(action)
		}

		
        // return dispatch(addUser());

	}

}

export default socketMiddleware