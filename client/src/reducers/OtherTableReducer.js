import {List, Map, fromJS} from 'immutable'

const init = List([])

export default function (tab = init, action){
    switch (action.type) {
    	case "SHARE_END_LINE" :
            console.log("APRES CA :E STATE QUI INTERESSE")
            return tab.update(t => {
                 return t.map(p => {
                    if (p.get('player').id === action.payload.playerInfo.id){
                        return p.set("endLine", action.payload.endLine)
                    }else {
                        return p
                    }
                 })
            })
/*        case "TOGGLE_TODO_X":
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload) { return t.update('isDone', isDone => true) } else { return t}}))
        case "TOGGLE_TODO_Y":
            return tab.update('column', List([]), column => column.map(t => { if (t.get('id') === action.payload) { return t.update('isDone', isDone => true) } else { return t}}))
        case "REVERSE_TOGGLE_Y" : 
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload - 1) { return t.update('isDone', isDone => false) } else { return t}}))
        case "REVERSE_TOGGLE_X" : 
            return tab.update('line', List([]), line => line.map(t => { if (t.get('id') === action.payload - 1) { return t.update('isDone', isDone => false) } else { return t}}))
        */
        case "INIT_OTHER_TAB" :
            console.log("INIT TAB == ", action.payload)
            return tab.push(Map(action.payload))
        default :
            return tab;
    }
}