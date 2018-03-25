import Button from '../components/Buttons'
import { connect } from 'react-redux'
import { createTableX, createTableY, startMove, toggleTodoX, toggleTodoY, reverseToggleX, reverseToggleY, getPiece, move, getEndLine} from '../action/action'
import  store  from '../index'

//REVOIR IS POSSIBLE

const calculeRotate = (piece) =>{
    // regarder le type de la piece si carre => rien faire + rajouter un x, y 
    //(peut etre que 1 meme) si il est prsent on remonte la piece de ce quq'il faut pour que la rotation se passe mibe            
            let newPiece = []
            let tmp_pos = {}
        for (let i = 0; i < piece.length; i++){
            if (i != 1){
                let new_x =(piece[i].x - piece[1].x)
                let new_y =(piece[i].y - piece[1].y)
                let X = Math.round(new_x * Math.cos(Math.PI / 2) - new_y * Math.sin(Math.PI / 2) + piece[1].x)
                let Y = Math.round(new_x * Math.sin(Math.PI / 2) + new_y * Math.cos(Math.PI / 2) + piece[1].y)
                tmp_pos = { x : X, y : Y }
            }else{
                tmp_pos = { x : piece[i].x, y : piece[i].y}
            }
            newPiece.push(tmp_pos)
            tmp_pos = {} 
        }
    return newPiece
}
const isPossible = (piece, move) => {
    // la revoir pour doirte ou gauche
    let endLine = store.getState().toJS().endLine.slice()
    let i = 0
    let x, y
    if (endLine.length > 0){

        switch (move){
            case 'down' :
                x = 0
                y = 1
                endLine.forEach(item => {
                    piece.forEach(p => {
                        if (item.x == p.x && item.y == p.y + 1 || p.y === 19)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break
            case 'left' :
                x = -1
                y = 0
                endLine.forEach(item => {
                    piece.forEach(p => {
                        if (item.x == p.x && item.y == p.y || p.y === 19)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break
            case 'right' :
                x = 1
                y = 0
                endLine.forEach(item => {
                    piece.forEach(p => {
                        if (item.x == p.x  && item.y == p.y || p.y === 19){
                            console.log("px.x ==", p.x, "item.x ===", item.x )
                            console.log("px.y ==", p.y, "item.y ===", item.y )
                            i++
                        }
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break
            default :
                x = 0
                y = 0
                endLine.forEach(item => {
                    piece.forEach(p => {
                        if (item.x == p.x + x && item.y == p.y + y || p.y === 19)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break

        }
        
    }else{
        piece.forEach(p => {
                if (19 === p.y)
                    i++
                if (p.x < 0 || p.x > 9)
                    i++
            })
    }
    console.log(i)
    return i 
}

const mapStateToProps = (state) => {
        return  {   tab : state.get('line'),
                    column : state.get('column'), 
                    piece : state.get('piece'),
                    endLine : state.get('endLine')
                }
}

const mapDispatchToProps = (dispatch) => {
    const piece = [
        {x : 3, y : 0},
        {x : 4, y : 0},
        {x : 5, y : 0},
        {x : 4, y : 1}
    ]
        return {
            createTable : () => {
                let i = 0
                for(let x = 0; x < 10; x++) {
                    dispatch(createTableX(x))
                   
                }
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
                dispatch(getPiece(piece))
            },
            startMove : () => {
                let i = 0
                let refreshIntervalId = setInterval(() => {
                    let currentPiece = store.getState().toJS().piece.slice()
                    let newPose = []
                    i++
                    if (isPossible(currentPiece, 'down') === 0){
                        currentPiece.map(p => {
                            newPose.push({x : p.x, y : p.y+ 1})
                        })
                            dispatch(move(newPose))
                    }else{
                        let newEndLine = store.getState().toJS().endLine.slice().concat(currentPiece)
                        const newPiece = [
                            {x : 4, y : 0},
                            {x : 4, y : 1},
                            {x : 4, y : 2},
                            {x : 5, y : 2}
                        ]
                        dispatch(getEndLine(newEndLine))
                        dispatch(getPiece(newPiece))
                        //  quand line .y == < 0 => clearInterval(refreshIntervalId)
                    }
                },500)
            },
            KeyDown : (key ) => {
                let newPose = []
                let currentPiece = store.getState().toJS().piece.slice()
                let i = 0
                let mve = ""
                switch (key.key) {
                    case "ArrowLeft":
                            mve = "left"
                            currentPiece.map(p => {
                                newPose.push({x : p.x - 1, y : p.y})
                            })
                        break
                    case "ArrowRight" : 
                        mve = "right"
                        currentPiece.map(p => {
                            newPose.push({x : p.x +1, y : p.y})
                        })
                        break
                    case "ArrowUp":
                        mve = "up"
                        newPose = calculeRotate(currentPiece).slice()
                        break

                }
                if (isPossible(newPose, mve) === 0){
                    dispatch(move(newPose))
                }
                console.log(key.key)
            }
        }
}

const BouttonContainers = connect(
        mapStateToProps,
        mapDispatchToProps
)(Button)

export default BouttonContainers
