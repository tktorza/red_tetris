
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

export const getPiece = (piece) =>{
	return {
		type : 'GET_PIECE',
		payload : piece
	}
}

export const move = (piece) => {
	return {
		type : 'MOVE',
		payload : piece
	}
}



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