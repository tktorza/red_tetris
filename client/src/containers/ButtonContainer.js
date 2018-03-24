import Button from '../components/Buttons'
import { connect } from 'react-redux'
import { createTableX, createTableY, startMove, toggleTodoX, toggleTodoY, reverseToggleX, reverseToggleY, getPiece, move} from '../action/action'
import  store  from '../index'

const calculeRotate = (piece) =>{
    // regarder le type de la piece si carre => rien faire + rajouter un x, y 
    //(peut etre que 1 meme) si il est prsent on remonte la piece de ce quq'il faut pour que la rotation se passe mibe            
            let newPiece = []
            let tmp_pos = {}
            console.log("lalalal = ", piece)
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
        console.log("result = ", newPiece )
    return newPiece
}


const mapStateToProps = (state) => {
        return  { tab : state.get('line'), column : state.get('column'), piece : state.get('piece') }
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
                setInterval(() => {
                    let currentPiece = store.getState().toJS().piece.slice()

                    let newPose = []
                    i++
                    currentPiece.map(p => {
                        if (p.y + 1 <= 19){
                            newPose.push({x : p.x, y : p.y+ 1})
                        }
                    })
                    if (newPose.length === 4){
                        dispatch(move(newPose))
                    }
                },500)
            },
            KeyDown : (key, ) => {
                console.log(key)
                let newPose = []
                let currentPiece = store.getState().toJS().piece.slice()
                let i = 0
                switch (key.key) {
                    case "ArrowLeft":
                        currentPiece.map(p => {
                            if (p.x - 1 >= 0){
                                newPose.push({x : p.x - 1, y : p.y})
                            }
                        })
                        break
                    case "ArrowRight" : 
                        currentPiece.map(p => {
                            if (p.x + 1 <= 9){
                                newPose.push({x : p.x +1, y : p.y})
                            }
                        })
                        break
                    case "ArrowUp":
                        newPose = calculeRotate(currentPiece).slice()
                        break
                    default:
                        break;

                }
                if (newPose.length === 4 && i ==0){
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
