import {List, Map, fromJS} from 'immutable'

const init = List([])

export default function (tab = init, action){
    switch (action.type) {
    	case "SHARE_END_LINE" :
            return tab.update(t => {
                 return t.map(p => {
                    if (p.get('player').id === action.payload.playerInfo.id){
                        return p.set("endLine", action.payload.endLine)
                    }else {
                        return p
                    }
                 })
            })
        case "REMOVE_USER" : 
            console.log("APRES CA")
            return tab.update(t => {
                return t.filter(player => {
                    console.log("ttt =", player.get('player').id)
                    console.log(action.payload)
                    console.log(player.get('player').id != action.payload)
                    return player.get('player').id != action.payload
                })
                // return t.map(p => {
                // console.log("T == ", p.toJS())
                //     if (p.get('player').id === action.payload){
                //         return p.clear()
                //     }else{
                //         return p
                //     }
                // })
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
            console.log("AJOUT")
            return tab.push(Map(action.payload))
        default :
            return tab;
    }
}