import React from 'react'
import OtherPlayerCell from './OtherPlayerCell'

const OtherPlayerBoard = (props) => {
  const {player, column, line} = props
  if (player.player.isLooser)
    return (<div><div><img src={'https://astucesdefilles.com/wp-content/uploads/2017/06/11-things-anyone-whos-ever-dated-a-total-looser-k-2-10562-1440004132-3_dblbig.jpg'} style={{width: "220px", height: "237px"}}/></div><p>{player.player.name}</p></div>)
  else if (player.player.isWinner)
    return (<div><div><img src={'https://png.pngtree.com/element_origin_min_pic/17/07/23/473f204a1589862d0264b14f926b4b59.jpg'} style={{width: "220px", height: "237px"}}/> </div><p>{player.player.name}</p></div>)
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
