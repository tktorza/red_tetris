import React from 'react'
import {List, Map} from 'immutable'
import functional from 'react-functional-lifecycle'
import Cell from './Cell'
import OtherTabContainer from '../containers/OtherTabContainer'


//
const Button = (props) => {
    const {createGame, tab, column, currentPiece, startMove, KeyDown, endLine, gameStart, gameId, getPiece, createPiece, isFirst, startMove_2} = props
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
        }
        // if (evt.key.localCompare("ArrowRight") == 0 || evt.key.localCompare("ArrowLeft") == 0 || evt.key.localCompare("ArrowUp") == 0)
    }
    // comprendre pq cette ligne met un warning
    // if (typeof(game.player) != 'undefined' && typeof(currentPiece.coord) == 'undefined')
    //     createPiece()

    const start = () => event => {
        startMove_2()
    }
    let visib_2 = "hidden"
    if (tab.toJS().length > 0 && isFirst){
        visib_2 = 'visible'
    }
    let infoParti = window.location.href.split('/')
    console.log(infoParti)
    if (infoParti.length == 4 && tab.toJS().length == 0){
        let info = infoParti[3].replace('#', '').replace(/]/gi, '').split('[')
        console.log("I = ",info)
        if (info.length == 2)
           createGame(info)
    }
    // if (gameStart == true){
    //     console.log("...../////", gameStart)
    //     startMove()
    // }

    // if (gameStart == true){
    //     startMove()
    // }
   /*
        recupere l'url l'envoie a startgame le game et le name 1qui recupere l'objet game pour ce jeux
    if (test.length == 5 && tab.toJS().length == 0){
        createGame()
        console.log(test)
    }*/
    /*
    detect quand l'utilisateur quitte la page
    window.addEventListener("beforeunload", (ev) => 
    {
        console.log("ici")
        createGame() 
        ev.preventDefault();
        return
    });*/
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
//
export default functional(Button, {
 
    componentWillMount: (props) => {
        // do something.. 
        console.log("MOUNT", props)
    },
 
    shouldComponentUpdate: (props, nextProps) => {
        if (props.gameStart == false && nextProps.gameStart == true)
            props.startMove()
        return true
        // do something... 
    }
 
});