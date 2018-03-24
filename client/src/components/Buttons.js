import React from 'react'
import {List, Map} from 'immutable'
let i = 0
const Cell = (props) => {
   const { tab, column, piece, KeyDown} = props
   let test = []
   let color = false
   piece.map(p => {
        if (tab.id === p.y && column.id == p.x){
            color = true
        }
    
   })
    if (color === false){
        test.push(<div style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'white'}} className={tab.id}/>)
    
    }else{
        test.push(<div style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'blue'}} className={tab.id}/>)
        
    }
    return test
    console.log("CEll ==", tab)
}
//
const Button = (props) => {
    const {createTable, tab, column, piece, startMove, KeyDown} = props


    document.onkeydown = (evt) => {
        evt = evt || window.event;
        KeyDown(evt, piece);
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
                            <Cell key={t.get('id')} tab={t.toJS()} column={c.toJS()} piece={piece}/>
                        ))}
                    </div>
               ))}
            </div>
        </div>
        )
}

export default Button