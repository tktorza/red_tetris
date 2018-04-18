import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {joinGame, room, user, gravity} = props 
    console.log(room)
    return (
        <div className="" href="" onClick={()=>{
            joinGame(room, user, gravity)
            
        }} style={{cursor : 'pointer'}}>Join game
        </div>
    )
  }
  
  export default JoinGame