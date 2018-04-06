import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {createGame, room, user} = props 
    return (
        <div>
        <a className="" href="" onClick={()=>{
            createGame(room, user)
        }}>Join game</a>
        </div>
    )
  }
  
  export default JoinGame