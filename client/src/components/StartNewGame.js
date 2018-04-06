import React from 'react'
import { connect } from 'react-redux'

const StartNewGame = ( props ) => {
    const {createGame, room, user} = props 
    return (
        <a className="" value="Join game" href="" onClick={()=>{
            createGame(room, user)
        }}/>
    )
  }
  
  export default StartNewGame