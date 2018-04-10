import {List, Map, fromJS} from 'immutable'

const init = fromJS({
    rooms : [],
    user : '',
    inGame : false
})

export default function (tab = init, action){
    switch (action.type) {
    	case "GET_CURRENT_ROOMS" :
            return tab.update('rooms', List([]), rooms => {
                return rooms = action.payload
            })
        case "IN_GAME" : 
            return tab.update('inGame', inGame => inGame = true)
        case "ADD_USER" : 
            return tab.update('user', user => {
                return user = action.payload
            })
        default :
            return tab;
    }
}
