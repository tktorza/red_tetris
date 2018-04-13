import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {joinGame, room, user} = props 
    console.log(room)
    return (
        <div className="" href="" onClick={()=>{
            joinGame(room, user)
            
        }} style={{cursor : 'pointer'}}>Join game
        </div>
    )
  }
  
  export default JoinGame