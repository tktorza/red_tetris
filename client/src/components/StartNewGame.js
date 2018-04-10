import React from 'react'
import { connect } from 'react-redux'

const StartNewGame = ( props ) => {
    const {createGame, room, user} = props 
    return (
        <div className="" onClick={()=>{
            createGame(room, user)
        }} style={{cursor : 'pointer'}}>Start New Game</div>
    )
  }
  
  export default StartNewGame