export const addUser = (user) => {
    return {
        type: 'server/ADD_USER', 
        payload: user
    }
}

export const shareWinner= (gameId, playerInfo) => {
    return {
        type : "server/SHARE_WINNER",
        gameId : gameId,
        playerInfo : playerInfo
    }
}

export const loose = (gameId, playerInfo) => {
    return {
        type : "server/IS_LOOSE",
        gameId : gameId,
        playerInfo : playerInfo
    }
}

export const restartGame = (gameId) => {
    return {
        type : "server/RESTART_GAME",
        gameId : gameId
    }
}
export const joinGame = (room, playerName) => {
    return {
        type : "server/JOIN_GAME",
        room : room,
        playerName : playerName
    }
}

export const inGame = () => {
    return {
        type : "IN_GAME"
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

export const upScore = () => {
    return {
        type : "UP_SCORE"
    }
}