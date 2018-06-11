import React from 'react'
import { connect } from 'react-redux'

const StartNewGame = ( props ) => {
    const {createGame, room, user, gravity} = props 
    return (
        <div className="" onClick={()=>{
            createGame(room, user, gravity)
        }} style={{cursor : 'pointer'}}>Start New Game</div>
    )
  }
  
  export default StartNewGame