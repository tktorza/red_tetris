import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {createGame, room, user} = props 
    console.log(room)
    return (
        <div>
        <a className="" href="" onClick={()=>{
            // createGame(room, user)
            window.location.href = 'localhost::3000/#'+room.id+'['+user+']';
        }}>Join game</a>
        </div>
    )
  }
  
  export default JoinGame