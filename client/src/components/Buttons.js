import React from 'react'
import {List, Map} from 'immutable'
import functional from 'react-functional-lifecycle'
import Cell from './Cell'
import OtherTabContainer from '../containers/OtherTabContainer'


//
const Button = (props) => {
    const {createGame, tab, column, SpaceDown, currentPiece, startMove, KeyDown, endLine, gameStart, gameId, getPiece, createPiece, isFirst, startMove_2, disconnected, playerInfo} = props
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        console.log(evt)
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
    let visib_2 = "hidden"
    if (tab.toJS().length > 0 && isFirst){
        visib_2 = 'visible'
    }
     window.onbeforeunload = (e) => {
        disconnected()
    };
    if (playerInfo.isVisitor == true){
        return (
            <div  style={{display:'flex', justifyContent : 'space-between'}}>
                <OtherTabContainer />
            </div>
            )
    }
    else{
        return (
            <div  style={{display:'flex', justifyContent : 'space-between'}}>
                <button onClick={start()} style={{visibility : visib_2}}>Start</button>
                <div className="board" style={{display:'flex'}}>
                   {column.map(c => (
                        <div key={c.get('id')} id={c.get('id')}>
                            {tab.map(t => (
                                <Cell key={`${t.get('id')} ${c.get('id')}`} tab={t.toJS()} column={c.toJS()} currentPiece={currentPiece} endLine={endLine}/>
                            ))}
                        </div>
                   ))}
                </div>
                <OtherTabContainer />
                
            </div>
            )
    }
}
//
export default functional(Button, {
 
    componentWillMount: (props) => {
        if (typeof(props.playerInfo.name) == 'undefined'){
            let infoParti = window.location.href.split('/')
            if (infoParti.length == 4){
                let info = infoParti[3].replace('#', '').replace(/]/gi, '').split('[')
                if (info.length == 2)
                   props.createGame(info)
            }
        } 
    },
 
    shouldComponentUpdate: (props, nextProps) => {
        if (props.gameStart == false && nextProps.gameStart == true)
            props.startMove()
        if (typeof(props.playerInfo.isVisitor) == 'undefined' && typeof(nextProps.playerInfo.isVisitor) == 'boolean' && nextProps.playerInfo.isVisitor){
            // envoyer au server que l'on rejoin le game et qu'il envoit au autre client de partager les endLine 
            console.log("1")
            props.getUserInGame()
        }
        if (props.ifUserVisitor == false && nextProps.ifUserVisitor === true){
            console.log("2")
            props.initOtherTab()
        }
        if (props.malusLength < nextProps.malusLength){
            props.shareEndLine()
        }
        return true
    }
 
});