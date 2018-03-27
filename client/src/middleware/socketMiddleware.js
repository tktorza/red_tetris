
const socketMiddleware = socket => ({dispatch, getState}) => {
	if(socket){
		console.log("ON EST DANS LE MIDDLEWARE")
	 	socket.on('action', dispatch)
  	}
  	return next => action => {
	    if (socket && action.type && action.type.indexOf('server/') === 0) {
	      const serverAction = action.type.split('/')[1]
	      console.log("MIDELWARE = ",action)
	      socket.emit(serverAction, action.payload)
	    }

    	return next(action)
  	}
	// return next => action => {
	// 	console.log("iokokokok ")
	// 	console.log(action)
	// 	if (action.type.indexOf('server/') && socket){
	// 		let emit = action.type.split('/')[1]
	// 		socket.emit(emit, action)
	// 		socket.on()
	// 	}
	// 	// console.log(getState)
	// 	switch(action.type){
	// 		case 'GET_PIECE' :
	// 			io.emit('startNewGame', action)
	// 			io.on('piece', data => {
	// 				action = data
	// 				console.log("ACTION =", action)
	// 				return next(action)
	// 			})
	// 		default :
	// 			return next(action)
	// 	}

		
 //        // return dispatch(addUser());

	// }

}

export default socketMiddleware