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
            return tab.update(t => {
                return t.filter(player => {
                    return player.get('player').id != action.payload
                })
            })
        case "RESTART" : 
            return init
        case "INIT_OTHER_TAB" :
            return tab.push(Map(action.payload))
        default :
            return tab;
    }
}