import socket from 'socket.io-client'

const io = socket('http://localhost:9000')

const socketMiddleware = ({dispatch, getState}) => {
	return next => action => {
		console.log("iokokokok ")
		console.log(action)
		// console.log(getState)
		switch(action.type){
			case 'GET_PIECE' :
				io.emit('startNewGame', action)
				io.on('piece', data => {
					action = data
					console.log("ACTION =", action)
					return next(action)
				})
			default :
				return next(action)
		}

		
        // return dispatch(addUser());

	}

}

export default socketMiddleware