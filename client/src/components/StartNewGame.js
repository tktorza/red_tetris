import React from 'react'
import { connect } from 'react-redux'

const StartNewGame = ( props ) => {
    const {createGame, room, user} = props 
    return (
        <div className="" onClick={()=>{
            createGame(room, user)
        }}>Start New Game</div>
    )
  }
  
  export default StartNewGame