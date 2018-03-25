import React from 'react'
import {List, Map} from 'immutable'
let i = 0
const Cell = (props) => {
   const { tab, column, piece, KeyDown, endLine} = props
   let test = []
   let color = false
   let end = false
   piece.map(p => {
        if (tab.id === p.y && column.id == p.x){
            color = true
        }
    
   })
   // console.log(endLine)
   for (let i = 0; i < endLine.length; i++){
        if (endLine[i].y === tab.id && endLine[i].x === column.id){
            end = true
        }
   }
    if(end === true){
        test.push(<div style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'red'}} className={tab.id}/>)
    }else if (color === false){
        test.push(<div style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'white'}} className={tab.id}/>)
    
    }else{
        test.push(<div style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'blue'}} className={tab.id}/>)
        
    }
    return test
    console.log("CEll ==", tab)
}
//
const Button = (props) => {
    const {createTable, tab, column, piece, startMove, KeyDown, endLine} = props


    document.onkeydown = (evt) => {
        evt = evt || window.event;
        KeyDown(evt);
    }
    const onClick = (event) => {
        createTable()
    }
    const start = () => event => {
        startMove()
    }
        let visib = "visible"
        let visib_2 = "hidden"
        if (tab.toJS().length > 0){
            visib = 'hidden'
            visib_2 = 'visible'
        }
        
    return (
        <div>
            <button onClick={onClick} style={{visibility:visib}}>Click for start</button>
            <button onClick={start()} style={{visibility : visib_2}}>Start</button>
            <div className="board" style={{display:'flex'}}>
               {column.map(c => (
                    <div key={c.get('id')} id={c.get('id')}>
                        {tab.map(t => (
                            <Cell key={`${t.get('id')} ${c.get('id')}`} tab={t.toJS()} column={c.toJS()} piece={piece} endLine={endLine}/>
                        ))}
                    </div>
               ))}
            </div>
        </div>
        )
}

export default Button