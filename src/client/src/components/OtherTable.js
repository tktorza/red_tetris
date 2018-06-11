import React from 'react'
// import Cell from './Cell'

const Cell = (props) => {
     const { tab, column, endLine} = props
     let test = []
     let end = false
     let isLoose = false
     for (let i = 0; i < endLine.length; i++){
          if (endLine[i].y === tab.id && endLine[i].x === column.id){
              end = true
          }
     }
    if(end === true){
        test.push(<div key={column.id} style={{width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'red'}} className={tab.id}/>)
    }else{
        test.push(<div key={column.id} style={{width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'white'}} className={tab.id}/>)
        
    }
    return test
}

//
const Test = (props) => {
  const {player, column, line} = props
  if (player.player.isLooser)
    return (<div><div>LOOSER</div><p>{player.player.name}</p></div>)
  else if (player.player.isWinner)
    return (<div><div>WINNER</div><p>{player.player.name}</p></div>)
  else{
    return (
    <div><div className="board" style={{display:'flex'}}>
                {column.map(c => (
                        <div key={c.id} id={c.id}>
                          {line.map(l => (
                                <Cell key={l.id} tab={l} column={c} endLine={player.endLine}/>
                          ))}
                        </div>
                ))}
            </div>
            <p>{player.player.name}</p></div>
      )
  }
}
const OtherTable = (props) => {
	const { player } = props
  let line = []
  let column = []
  for (let x = 0; x < 10; x++){
  	column.push({ id : x})
  }
  for (let y = 0; y < 20; y++){
  	line.push({ id : y})
  }
  return (
  		<div>
  			{player.map(p => (
          <div key={p.player.id}>
            <Test player={p} column={column} line={line}/>
          </div>

  			))}
  		</div>
              
  		)
}

export default OtherTable