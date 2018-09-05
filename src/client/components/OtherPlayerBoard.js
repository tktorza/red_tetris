import React from 'react'
import OtherPlayerCell from './OtherPlayerCell'

const OtherPlayerBoard = (props) => {
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
                                <OtherPlayerCell key={l.id} tab={l} column={c} endLine={player.endLine}/>
                          ))}
                        </div>
                ))}
            </div>
            <p>{player.player.name}</p></div>
      )
  }
}

export default OtherPlayerBoard
