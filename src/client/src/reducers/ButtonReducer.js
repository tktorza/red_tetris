
import {List, Map, fromJS} from 'immutable'

const init = fromJS({
        column : [],
        line : [],
        currentPiece : [],
        endLine : [],
        malusLength : 0,
        nextPiece : [],
        playerInfo : {},
        gameId : 0 , 
        gameStart : false,
        isFirst : false,
        ifUserVisitor : false,
        isLooser : false,
        isWinner : false,
        score : 0
    })

let addEnd = [
    { x : 0, y : 19},
    { x : 1, y : 19},
    { x : 2, y : 19},
    { x : 3, y : 19},
    { x : 4, y : 19},
    { x : 5, y : 19},
    { x : 6, y : 19},
    { x : 7, y : 19},
    { x : 8, y : 19},
    { x : 9, y : 19}
]
export default function (tab = init, action){
    switch (action.type) {
        case "CREATE_TAB_Y":
            return tab.update('line', List([]), line => line.push(Map(action.payload)))
        case "CREATE_TAB_X":
            return tab.update('column', List([]), column => column.push(Map(action.payload)))
        case "GET_CURRENT_PIECE":
            return tab.update('currentPiece', List([]), currentPiece => currentPiece = action.payload)
        case "MOVE" :
            return tab.update('currentPiece', List([]), currentPiece => currentPiece = action.payload)
        case "GET_LINE" : 
            return tab.update('endLine', List([]), endLine => endLine = action.payload)
        case "CREATE_GAME" :
            return tab.update('gameId', gameId => gameId = action.id).update('isFirst', isFirst => isFirst = action.isFirst).update('playerInfo', List([]), playerInfo => playerInfo = action.playerInfo)
        case "START_GAME" : 
            return tab.update('gameStart', gameStart => gameStart = !gameStart)
        case "GET_NEXT_PIECE" :
            return tab.update('nextPiece', List([]), nextPiece => nextPiece = action.payload)
        case "MALUS" :
            return tab.update('endLine', List([]), endLine => {
                return endLine.map(e => {
                    return {x : e.x, y : e.y - 1}
                }) 
            }).update('endLine', List([]), endLine => {
                return endLine.concat(addEnd)
            }).update('malusLength', malusLength => {
                return malusLength += 1
            })
        case "REFRESH_USER_FIRST" :
            return tab.update('isFirst', isFirst => isFirst = true)
        case "USER_GAME" :
            return tab.update('ifUserVisitor', ifUserVisitor => ifUserVisitor = !ifUserVisitor)
        case "DISCONNECTED" :
            return init
        case "END" : 
        //update player info
            return tab.update('playerInfo',  List([]), playerInfo => playerInfo = action.payload)
        // case "WINNER" : 
        //update player info
            // return tab.update('isWinner', isWinner => isWinner = true)
        case "RESTART_GAME": 
        //update player info
            return tab.update('endLine', List([]), endLine => endLine = []).update('score', score => score = 0)
        case "UP_SCORE" :
            return tab.update('score', score => score += 10)
        default :
            return tab;
    }
}