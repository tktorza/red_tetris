import {List, Map, fromJS} from 'immutable'

const init = fromJS({
        column : [],
        line : [],
        currentPiece : [],
        endLine : [],
        nextPiece : [],
        playerInfo : {},
        gameId : 0 , 
        gameStart : false,
        isFirst : false,
    })

export default function (tab = init, action){
    switch (action.type) {
/*        case "TOGGLE_TODO_X":
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload) { return t.update('isDone', isDone => true) } else { return t}}))
        case "TOGGLE_TODO_Y":
            return tab.update('column', List([]), column => column.map(t => { if (t.get('id') === action.payload) { return t.update('isDone', isDone => true) } else { return t}}))
        case "REVERSE_TOGGLE_Y" : 
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload - 1) { return t.update('isDone', isDone => false) } else { return t}}))
        case "REVERSE_TOGGLE_X" : 
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload - 1) { return t.update('isDone', isDone => false) } else { return t}}))
        */
        case "CREATE_TAB_Y":
            return tab.update('line', List([]), line => line.push(Map(action.payload)))
        case "CREATE_TAB_X":
            return tab.update('column', List([]), column => column.push(Map(action.payload)))
        case "GET_CURRENT_PIECE":
            console.log("C = ", action)
            return tab.update('currentPiece', List([]), currentPiece => currentPiece = action.payload)
        case "MOVE" :
            return tab.update('currentPiece', List([]), currentPiece => currentPiece =action.payload)
        case "GET_LINE" : 
            return tab.update('endLine', List([]), endLine => endLine = action.payload)
        case "CREATE_GAME" :
            console.log("pay = ", action)
            return tab.update('gameId', gameId => gameId = action.id).update('isFirst', isFirst => isFirst = action.isFirst).update('playerInfo', List([]), playerInfo => playerInfo = action.playerInfo)
        case "START_GAME" : 
            console.log('START GAME')
            return tab.update('gameStart', gameStart => gameStart = !gameStart)
        case "GET_NEXT_PIECE" :
            console.log("GET_NEXT_PIECE", action.payload)
            return tab.update('nextPiece', List([]), nextPiece => nextPiece = action.payload)
        default :
            return tab;
    }
}