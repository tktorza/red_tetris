
const socketMiddleware = socket => ({dispatch, getState}) => {
	if(socket){
		
	 	socket.on('action', dispatch)
  	}
  	return next => action => {
	    if (socket && action.type && action.type.indexOf('server/') === 0) {
	      const serverAction = action.type.split('/')[1]
	      socket.emit(serverAction, action)
	    }
    	return next(action)
  	}

}

export default socketMiddleware