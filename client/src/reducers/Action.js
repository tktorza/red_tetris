import {List, Map, fromJS} from 'immutable'

const init = fromJS({
        column : [],
        line : [],
        piece : [],
        endLine : []
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
        case "GET_PIECE":
            return tab.update('piece', List([]), piece => piece = Object.assign({}, action.payload))
        case "MOVE" :
            return tab.update('piece', List([]), piece => piece = Object.assign({}, action.payload))
        case "GET_LINE" : 
            return tab.update('endLine', List([]), endLine => endLine = action.payload.slice())
        default :
            return tab;
    }
}