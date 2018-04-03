import Button from '../components/Buttons'
import { connect } from 'react-redux'
import { createTableX, createTableY,
         startMove, toggleTodoX,
         toggleTodoY, reverseToggleX,
         reverseToggleY, getCurrentPiece,
         move, getEndLine, createGame,
         getMorePiece, getNextPiece,
         startGameServer, startGameClient,
         shareEndLine, initOtherTab,
         sendMalus, disconnected } from '../action/action'
import  store  from '../index'

const isLoose = (table) => {
    let i = 0
    // regarder si possible quadn on pose la piece sur le tabelau
    table.forEach( function(elem) {
        // statements
        if (elem.y < 0){
            i++
        }
    });
    if (i  == 0)
        return false
    else{
        return true
    }
}

const getNewEndLine = (table, dispatch, gameId, malus) => {
    let tmptab = []
    for (let i = 0; i < table.length; i++){
        tmptab = table.filter(filtre => {
            if (filtre.y < 20 - malus)
                return (filtre.y == table[i].y)
        })
        if (tmptab.length == 10){
            dispatch(sendMalus(gameId))
            table = table.filter(remove => {
                return (remove.y != tmptab[0].y)
            })
            table.forEach(item => {
                if (item.y < tmptab[0].y){
                    item.y += 1
                }
          })
            tmptab = []
        }
    }
    return (table)
}


const calculeRotate = (piece) =>{
    // regarder le type de la piece si carre => rien faire + rajouter un x, y 
    //(peut etre que 1 meme) si il est prsent on remonte la piece de ce quq'il faut pour que la rotation se passe mibe            
        if (piece.type != 1){
                let newPiece = {type : piece.type, coord : []}
                let tmp_pos = {}

            for (let i = 0; i < piece.coord.length; i++){
                if (i != 1){
                    let new_x =(piece.coord[i].x - piece.coord[1].x)
                    let new_y =(piece.coord[i].y - piece.coord[1].y)
                    let X = Math.round(new_x * Math.cos(Math.PI / 2) - new_y * Math.sin(Math.PI / 2) + piece.coord[1].x)
                    let Y = Math.round(new_x * Math.sin(Math.PI / 2) + new_y * Math.cos(Math.PI / 2) + piece.coord[1].y)
                    tmp_pos = { x : X, y : Y }
                }else{
                    tmp_pos = { x : piece.coord[i].x, y : piece.coord[i].y}
                }
                newPiece.coord.push(tmp_pos)
                tmp_pos = {} 
            }
            return newPiece
        }else{
            return piece
        }
}
const isPossible = (piece, move) => {
    let endLine = store.getState().buttonReducer.toJS().endLine.slice()
    let i = 0
    let x, y
    if (endLine.length > 0){

        switch (move){
            case 'down' :
                x = 0
                y = 1
                endLine.forEach(item => {
                    piece.coord.forEach(p => {
                        if (item.x == p.x && item.y == p.y + 1 || p.y === 19)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break
            default :
                endLine.forEach(item => {
                    piece.coord.forEach(p => {
                        if (item.x == p.x  && item.y == p.y)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break

        }
        
    }else{
        piece.coord.forEach(p => {
                if (19 <= p.y)
                    i++
                if (p.x < 0 || p.x > 9)
                    i++
            })
    }
    return i 
}

const getNewPiece = (dispatch) => {
    let nextPiece = store.getState().buttonReducer.toJS().nextPiece.slice()
            
    let gameId = store.getState().buttonReducer.toJS().gameId
    let newPiece = nextPiece.shift()
    if (nextPiece.length == 0){
        dispatch(getMorePiece(gameId))
    }
    else{
        dispatch(getNextPiece(nextPiece))
    }
    dispatch(getCurrentPiece(newPiece))
}

const mapStateToProps = (state) => {
        return  {   
                    tab : state.buttonReducer.get('line'),
                    column : state.buttonReducer.get('column'), 
                    currentPiece : state.buttonReducer.get('currentPiece'),
                    endLine : state.buttonReducer.get('endLine'),
                    gameId : state.buttonReducer.get('gameId'),
                    gameStart : state.buttonReducer.get('gameStart'),
                    nextPiece : state.buttonReducer.get('nextPiece'),
                    isFirst : state.buttonReducer.get('isFirst'),
                    start : state.buttonReducer.get('start'),
                    playerInfo : state.buttonReducer.get('playerInfo'),
                    malusLength : state.buttonReducer.get('malusLength')
                }
}

const mapDispatchToProps = (dispatch) => {
    const piece = {
        type : 6,
        coord : [
                    { x : 4, y : 0 },
                    { x : 4, y : 1 },
                    { x : 4, y : 2 },
                    { x : 4, y : 3 }
                ]
    }
        return {
            createGame : (info) => {
                let i = 0
                dispatch(createGame(info[0], info[1]))
                for(let x = 0; x < 10; x++) {
                    dispatch(createTableX(x))
                   
                }
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
            },
            startMove : () => {
                let i = 0
                let gameId = store.getState().buttonReducer.toJS().gameId
                let playerInfo = store.getState().buttonReducer.toJS().playerInfo
                dispatch(initOtherTab(gameId, playerInfo))
                let refreshIntervalId = setInterval(() => {
                    let currentPiece = Object.assign({}, store.getState().buttonReducer.toJS().currentPiece)
                    let malus = store.getState().buttonReducer.toJS().malusLength
                    let newPose = {type : currentPiece.type, coord : []}
                    if (isPossible(currentPiece, 'down') === 0){
                        currentPiece.coord.map(p => {
                            newPose.coord.push({x : p.x, y : p.y+ 1})
                        })
                            dispatch(move(newPose))
                    }else{
                        let newEndLine = store.getState().buttonReducer.toJS().endLine.slice().concat(currentPiece.coord)
                        let FinalLine = getNewEndLine(newEndLine.slice(), dispatch, gameId, malus)
                        if (isLoose(FinalLine) == true){
                            dispatch(getEndLine(FinalLine, gameId, playerInfo))
                            clearInterval(refreshIntervalId)
                        }
                        else{
                        //  i++

                        
                        // if (i >= 10){
                            // clearInterval(refreshIntervalId)
                        //     // si le player loose
                        // }
                            getNewPiece(dispatch)
                            dispatch(getEndLine(FinalLine, gameId, playerInfo))
                        }
                    }
                },900)
            },
            startMove_2 : () => {
                let gameId =  store.getState().buttonReducer.toJS().gameId
                // il me faut l'id du game
                dispatch(startGameServer(gameId))
            },
            KeyDown : (key ) => {
                let currentPiece = Object.assign({}, store.getState().buttonReducer.toJS().currentPiece)
                let newPose = {type : currentPiece.type, coord : []}
                let i = 0
                let mve = ""
                if (typeof(currentPiece.coord) != 'undefined'){
                    switch (key.key) {
                        case "ArrowLeft":
                                mve = "left"
                                currentPiece.coord.map(p => {
                                    newPose.coord.push({x : p.x - 1, y : p.y})
                                })
                            break
                        case "ArrowRight" : 
                            mve = "right"
                            currentPiece.coord.map(p => {
                                newPose.coord.push({x : p.x +1, y : p.y})
                            })
                            break
                        case "ArrowUp":
                            mve = "up"
                            newPose = Object.assign({}, calculeRotate(currentPiece))
                            break
                        case "ArrowDown":
                            mve = "down"
                            currentPiece.coord.map(p => {
                                newPose.coord.push({x : p.x, y : p.y + 1})
                            })
                            break

                    }
                    if (isPossible(newPose, mve) === 0){
                        dispatch(move(newPose))
                    }
                }
            },
            createPiece : () => {
                let game = Object.assign({}, store.getState().buttonReducer.toJS().game)
                dispatch(getCurrentPiece(game.player[0].player.currentPiece.piece))
                dispatch(getNextPiece(game.player[0].player.nextPiece))
            },
            shareEndLine : () => {
                let gameId = store.getState().buttonReducer.toJS().gameId
                let playerInfo = store.getState().buttonReducer.toJS().playerInfo
                let endLine = store.getState().buttonReducer.toJS().endLine.slice()
                dispatch(getEndLine(endLine, gameId, playerInfo))

            },
            disconnected : () => {
                let gameId = store.getState().buttonReducer.toJS().gameId
                let playerInfo = store.getState().buttonReducer.toJS().playerInfo
                dispatch(disconnected(gameId, playerInfo))
            }
        }
}

const BouttonContainers = connect(
        mapStateToProps,
        mapDispatchToProps
)(Button)

export default BouttonContainers
