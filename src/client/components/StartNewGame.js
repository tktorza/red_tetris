import React from 'react'
import { connect } from 'react-redux'
import {styles} from '../styles'

const StartNewGame = ( props ) => {
    const {createGame, room, user, gravity} = props 
    return (
        <div className="" onClick={()=>{
            createGame(room, user, gravity)
        }} style={styles.Start}>Start New Game</div>
    )
  }
  
  export default StartNewGame