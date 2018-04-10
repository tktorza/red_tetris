import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {createGame, room, user} = props 
    console.log(room)
    return (
        <div className="" href="" onClick={()=>{
            createGame(room, user)
            
        }}>Join game
        </div>
    )
  }
  
  export default JoinGame