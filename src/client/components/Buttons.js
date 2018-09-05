import React from 'react'
import {List, Map} from 'immutable'
import functional from 'react-functional-lifecycle'
import Cell from './Cell'
import OtherTabContainer from '../containers/OtherTabContainer'
// import Confetti from './Confetti'
import lifecycle from 'react-pure-lifecycle'
import imageWinner from '../../../img/imageWinner.jpeg'
import imageLooser from '../../../img/looser.jpeg'
const Button = (props) => {
    const {restartGame, score, tab, column, SpaceDown, currentPiece, startMove,
     KeyDown, endLine, gameStart, isFirst, startMove_2, disconnected, playerInfo} = props
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        switch (evt.key){
            case "ArrowRight" :
                KeyDown(evt);
                break;
            case "ArrowLeft" :
                KeyDown(evt);
                break
            case "ArrowUp" :
                KeyDown(evt);
                break;
            case "ArrowDown" :
                KeyDown(evt);
                break;
            case " " :
                SpaceDown();
                break; 
        }
    }
    const start = () => event => {
        startMove_2()
    }
    const Restart = () => event => {
        restartGame()
    }
    let visib_2
    if (gameStart == false && isFirst)
        visib_2 = "visible"
    else{
         visib_2 = 'hidden'
    }
     window.onbeforeunload = (e) => {
        disconnected()
    }
    if (playerInfo.isVisitor == true){
        return (
            <div  style={{display:'flex', justifyContent : 'space-between'}}>
                <OtherTabContainer />
            </div>
            )
    }else if (playerInfo.isWinner == true){
        return (
        <div style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute"}}>
            <div style={{display:'flex', justifyContent : 'space-between', zIndex : '1', position : 'relative'}}>
            <img src={imageWinner} style={{width: "220px", height: "237px"}}/>
                <OtherTabContainer />
            </div>
                <button style={{visibility : visib_2, marginLeft : "50%", marginTop: "10%", transform: "translate(-50%, -050%)"}} onClick={Restart()}>RestartGame</button>
        </div>
        )
    }
    else if (playerInfo.isLooser == false){
        return (
            <div  style={{display:'flex', margin : "2%"}}>
                <button onClick={start()} style={{visibility : visib_2}}>Start</button>
                <div className="board" style={{display:'flex', marginLeft : "2%"}}>
                   {column.map(c => (
                        <div key={c.get('id')} id={c.get('id')}>
                            {tab.map(t => (
                                <Cell key={`${t.get('id')} ${c.get('id')}`} tab={t.toJS()} column={c.toJS()} currentPiece={currentPiece} endLine={endLine}/>
                            ))}
                        </div>
                   ))}
                </div>
                <div style={{ marginLeft : "2%"}} >{score}</div>
                <OtherTabContainer />
                
            </div>
            )
    }else{
        return(
            <div style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute"}}>
            <div style={{display:'flex', justifyContent : 'space-between'}}>
            <img src={imageLooser} style={{width: "220px", height: "237px"}}/>

            <OtherTabContainer />
            </div>
                <button style={{visibility : visib_2, marginLeft : "50%", marginTop: "10%", transform: "translate(-50%, -50%)"}} onClick={Restart()}>RestartGame</button>

            </div>
        )
    }
}
//
// export default functional(Button, {
const methods = {
    componentWillMount: (props) => {
        // if (typeof(props.playerInfo.name) == 'undefined'){
        //     let infoParti = window.location.href.split('/')
        //     if (infoParti.length == 4){
        //         let info = infoParti[3].replace('#', '').replace(/]/gi, '').split('[')
        //         if (info.length == 2)
        //            props.nfo)
        //     }
        // } 
    },
 
    shouldComponentUpdate: (props, nextProps) => {
        if (props.gameStart == false && nextProps.gameStart == true && nextProps.playerInfo.isVisitor == false)
            props.startMove()
        if (typeof(props.playerInfo.isVisitor) == 'undefined' && typeof(nextProps.playerInfo.isVisitor) == 'boolean' && nextProps.playerInfo.isVisitor){
            // envoyer au server que l'on rejoin le game et qu'il envoit au autre client de partager les endLine 
            props.getUserInGame()
        }
        if (props.ifUserVisitor == false && nextProps.ifUserVisitor === true){
            props.initOtherTab()
        }
        if (props.malusLength < nextProps.malusLength){
            props.shareEndLine()
        }
        if (props.playerInfo.isWinner == false && nextProps.playerInfo.isWinner == true){
            props.refreshInterval()
        }
        return true
    }
 }

 export default lifecycle(methods)(Button)
// });