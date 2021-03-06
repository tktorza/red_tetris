import React from 'react'
import OtherPlayerBoard from './OtherPlayerBoard'
// import Cell from './Cell'

//
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
            <OtherPlayerBoard player={p} column={column} line={line}/>
          </div>

  			))}
  		</div>
              
  		)
}

export default OtherTable