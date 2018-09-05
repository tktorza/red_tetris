import React from 'react'
import OtherPlayerCell from './OtherPlayerCell'
import imageWinner from '../../../img/imageWinner.jpeg'
import imageLooser from '../../../img/looser.jpeg'

const OtherPlayerBoard = (props) => {
  const {player, column, line} = props
  if (player.player.isLooser)
    return (<div><div><img src={imageLooser} style={{width: "220px", height: "237px"}}/></div><p>{player.player.name}</p></div>)
  else if (player.player.isWinner)
    return (<div><div><img src={imageWinner}/> </div><p>{player.player.name}</p></div>)
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
