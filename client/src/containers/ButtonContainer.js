import Button from '../components/Buttons'
import { connect } from 'react-redux'
import { createTableX, createTableY,
         startMove, toggleTodoX,
         toggleTodoY, reverseToggleX,
         reverseToggleY, getCurrentPiece,
         move, getEndLine, createGame,
         getMorePiece, getNextPiece } from '../action/action'
import  store  from '../index'

const isLoose = (table) => {
    let i = 0
    // regarder si possible quadn on pose la piece sur le tabelau
    table.forEach( function(elem) {
        // statements
        console.log("elem = ", elem)
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

const getNewEndLine = (table) => {
    let tmptab = []
    for (let i = 0; i < table.length; i++){
        tmptab = table.filter(filtre => {
            return (filtre.y == table[i].y) })
        if (tmptab.length == 10){

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
    let endLine = store.getState().toJS().endLine.slice()
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
                if (19 === p.y)
                    i++
                if (p.x < 0 || p.x > 9)
                    i++
            })
    }
    console.log(i)
    return i 
}

const getNewPiece = (dispatch) => {
    let nextPiece = store.getState().toJS().nextPiece.slice()
    console.log("getNewPiece Next piece = ",nextPiece)
    
    let gameId = store.getState().toJS().game.id
    let newPiece = nextPiece.shift()
    if (nextPiece.length == 0){
        console.log("LALOL")
        console.log("PIECE === ", newPiece)
        dispatch(getMorePiece(gameId))
    }
    else{
        dispatch(getNextPiece(nextPiece))
    }
    dispatch(getCurrentPiece(newPiece.piece))
    // nouvelle piece
    //dispatch (update game)
}

const mapStateToProps = (state) => {
    console.log("NEXT PIECE : ",state.get('nextPiece') )
        return  {   
                    tab : state.get('line'),
                    column : state.get('column'), 
                    currentPiece : state.get('currentPiece'),
                    endLine : state.get('endLine'),
                    game : state.get('game'),
                    nextPiece : state.get('nextPiece')
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
            createTable : () => {
                let i = 0
                dispatch(createGame())
                for(let x = 0; x < 10; x++) {
                    dispatch(createTableX(x))
                   
                }
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
            },
            startMove : () => {
                let i = 0
                let refreshIntervalId = setInterval(() => {
                    let currentPiece = Object.assign({}, store.getState().toJS().currentPiece)
                    let newPose = {type : currentPiece.type, coord : []}
                    if (isPossible(currentPiece, 'down') === 0){
                        currentPiece.coord.map(p => {
                            newPose.coord.push({x : p.x, y : p.y+ 1})
                        })
                            dispatch(move(newPose))
                    }else{
                        let newEndLine = store.getState().toJS().endLine.slice().concat(currentPiece.coord)
                        let FinalLine = getNewEndLine(newEndLine.slice())
                        if (isLoose(FinalLine) == true){
                            // dispatch(getEndLine(FinalLine))
                            clearInterval(refreshIntervalId)
                            console.log("C PERDU")
                        }
                        else{
                        //  i++

                        
                        // if (i >= 10){
                            // clearInterval(refreshIntervalId)
                        //     // si le player loose
                        // }
                            getNewPiece(dispatch)
                            dispatch(getEndLine(FinalLine))
                        }
                    }
                },150)
            },
            KeyDown : (key ) => {
                let currentPiece = Object.assign({}, store.getState().toJS().currentPiece)
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
                console.log(key.key)
            },
            createPiece : () => {
                let game = Object.assign({}, store.getState().toJS().game)
                dispatch(getCurrentPiece(game.player[0].player.currentPiece.piece))
                dispatch(getNextPiece(game.player[0].player.nextPiece))
            }
        }
}

const BouttonContainers = connect(
        mapStateToProps,
        mapDispatchToProps
)(Button)

export default BouttonContainers
