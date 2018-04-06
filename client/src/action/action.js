export const addUser = (user) => {
    return {
        type: 'ADD_USER', 
        payload: user
    }
}

export const getAllRooms = () =>{
    return {
        type : 'server/GET_CURRENT_ROOMS'
    }
}

export const getEndLine = (endLine, gameId, playerInfo) => {
    return {
        type : 'server/GET_LINE',
        payload : endLine,
        gameId : gameId,
        playerInfo : playerInfo
    }
}

export const sendMalus = (id) =>{
    return {
        type: 'server/MALUS',
        id : id
    }
}

export const createTableX = (id) =>{
    return {
        type : 'CREATE_TAB_X',
        payload : {
            id : id,
            isDone : false
        }
    }
}

export const createTableY = (id) =>{
    return {
        type : 'CREATE_TAB_Y',
        payload : {
            id : id,
            isDone : false
        }
    }
}

export const disconnected = (gameId, playerInfo) => {
    return {
        type : 'server/DISCONNECTED',
        gameId : gameId,
        playerInfo : playerInfo
    }
}

export const getCurrentPiece = (piece = []) =>{
	return {
		type : 'GET_CURRENT_PIECE',
		payload : piece
	}
}

export const createGame = (room, playerName) => {
    return {
        type : 'server/CREATE_GAME',
        room : room,
        playerName : playerName
    }
}

export const getMorePiece = (id) => {
    return {
        type : 'server/GET_MORE_PIECE',
        payload : id
    }
}

export const getNextPiece = (piece) =>{
    return {
        type : "GET_NEXT_PIECE",
        payload : piece
    }
}

export const move = (piece) => {
	return {
		type : 'MOVE',
		payload : piece
	}
}

export const startGameServer = (id) => {
    return {
        type : 'server/START_GAME',
        id : id
    }
}

export const initOtherTab = (id, playerInfo) => {
    return {
        type : 'server/INIT_OTHER_TAB',
        id : id,
        playerInfo : playerInfo
    }

}

export const initOtherTabForVisitor = (id, playerInfo) => {
    return {
        type : 'server/initOtherTabForVisitor',
        id : id,
        playerInfo : playerInfo
    }
}
// export const shareEndLine = (endLine) => {
//     return {
//         type : 'server/SHARE_END_LINE',
//         payload : endLine
//     }
// }

/*
let nextTodoId = 0
export const toggleTodoX = (id) =>{
    return {
        type : 'TOGGLE_TODO_X',
        payload : id    
    }
}

export const toggleTodoY = (id) =>{
    return {
        type : 'TOGGLE_TODO_Y',
        payload : id    
    }
}

export const addTodo = (text) => {
    return {
        type : 'ADD_TODO',
        payload : {
            id : nextTodoId++,
            isDone : false,
            text : text
        }
    }
}*/

/*export const setVisibilityFilter = (filter) =>{
    return {
        type : 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const reverseToggleY = (id) =>{
    return {
        type : 'REVERSE_TOGGLE_Y',
        payload : id
    }
}

export const reverseToggleX = (id) =>{
    return {
        type : 'REVERSE_TOGGLE_X',
        payload : id
    }
}

*/