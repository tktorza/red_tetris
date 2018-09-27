import Button from '../components/Buttons'
import { connect } from 'react-redux'
import { createTableX, createTableY,
         startMove, getCurrentPiece,
         move, getEndLine, createGame,
         getMorePiece, getNextPiece,
         startGameServer, startGameClient,
         shareEndLine, initOtherTab,
         sendMalus, disconnected, upScore,
            initOtherTabForVisitor, loose, restartGame, shareWinner,
            inGame, joinGame} from '../actions/action'
import  store  from '../index'
import { getLowerCoord, getLowerDist, calculDown, isLoose, getNewEndLine, getSideBlock, getDecale,
         calculeRotate , isPossible, getNewPiece, getMoove} from '../utils'
let refreshIntervalId

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
                malusLength : state.buttonReducer.get('malusLength'),
                ifUserVisitor : state.buttonReducer.get('ifUserVisitor'),
                isLooser : state.buttonReducer.get('isLooser'),
                isWinner : state.buttonReducer.get('isWinner'),
                score : state.buttonReducer.get('score')
            }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinGame : (gameName, username, gravity) => {
            dispatch(inGame())
            dispatch(joinGame(gameName, username))
            for(let x = 0; x < 10; x++) {
                dispatch(createTableX(x))
               
            }
             if (gravity == 1){
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
            }else{
                 for (let y = 19; y >= 0; y--){
                    dispatch(createTableY(y))
                }
            }
        },
        startMove : () => {
            let gameId = store.getState().buttonReducer.toJS().gameId
            let playerInfo = store.getState().buttonReducer.toJS().playerInfo
            dispatch(initOtherTab(gameId, playerInfo))
            refreshIntervalId = setInterval(() => {
                let currentPiece = Object.assign({}, store.getState().buttonReducer.toJS().currentPiece)
                let malus = store.getState().buttonReducer.toJS().malusLength
                let newPose = {type : currentPiece.type, coord : []}
                let endLine = store.getState().buttonReducer.toJS().endLine.slice()
               
                if (isPossible(currentPiece, 'down', endLine) === 0){
                    currentPiece.coord.map(p => {
                        newPose.coord.push({x : p.x, y : p.y+ 1})
                    })
                        dispatch(move(newPose))
                }else{
                    let newEndLine = store.getState().buttonReducer.toJS().endLine.slice().concat(currentPiece.coord)
                    let FinalLine = getNewEndLine(newEndLine.slice(), dispatch, gameId, malus)
                    
                    if (isLoose(FinalLine) == true){
                        dispatch(getEndLine(FinalLine, gameId, playerInfo))
                        dispatch(loose(gameId, playerInfo))
                        clearInterval(refreshIntervalId)
                    }
                    else{
                        let nextPiece = store.getState().buttonReducer.toJS().nextPiece.slice()
                        getNewPiece(gameId, nextPiece, dispatch)
                        dispatch(getEndLine(FinalLine, gameId, playerInfo))
                    }
                }
            },900)
        },
        startMove_2 : () => {
            let gameId =  store.getState().buttonReducer.toJS().gameId
            
            dispatch(startGameServer(gameId))
        },
        KeyDown : (key ) => {
            let currentPiece = Object.assign({}, store.getState().buttonReducer.toJS().currentPiece)
            let endLine = store.getState().buttonReducer.toJS().endLine.slice()
            if (typeof(currentPiece.coord) != 'undefined'){
                let moove = getMoove(currentPiece, key, endLine)
                if (isPossible(moove.newPose, moove.moove, endLine) === 0){
                    dispatch(move(moove.newPose))
                }
            }
        },
        SpaceDown : () => {
            let currentPiece = Object.assign({}, store.getState().buttonReducer.toJS().currentPiece)
            let endLine = store.getState().buttonReducer.toJS().endLine.slice()
            let playerInfo = store.getState().buttonReducer.toJS().playerInfo
            let gameId = store.getState().buttonReducer.toJS().gameId
            let malus = store.getState().buttonReducer.toJS().malusLength
            let FinalLine = getNewEndLine(calculDown(Object.assign({}, currentPiece), endLine.slice()), dispatch, gameId, malus)
            let nextPiece = store.getState().buttonReducer.toJS().nextPiece.slice()
            getNewPiece(gameId, nextPiece, dispatch)
            dispatch(getEndLine(FinalLine, gameId, playerInfo))

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
        },
        getUserInGame : () => {
            let gameId = store.getState().buttonReducer.toJS().gameId
            
            dispatch({type : 'server/GET_USER_IN_GAME', id : gameId})
        },
        initOtherTab : () => {
            let gameId = store.getState().buttonReducer.toJS().gameId
            let playerInfo = store.getState().buttonReducer.toJS().playerInfo
            
            dispatch(initOtherTabForVisitor(gameId, playerInfo))
            dispatch({type : 'USER_GAME'})

        },
        restartGame : () => {
            let gameId = store.getState().buttonReducer.toJS().gameId
            dispatch(restartGame(gameId))
        },
        refreshInterval : () => {
            let playerInfo = store.getState().buttonReducer.toJS().playerInfo
            let gameId = store.getState().buttonReducer.toJS().gameId
            clearInterval(refreshIntervalId)
            dispatch(shareWinner(gameId ,playerInfo))
        }
    }
}

const BouttonContainers = connect(
        mapStateToProps,
        mapDispatchToProps
)(Button)

export default BouttonContainers
