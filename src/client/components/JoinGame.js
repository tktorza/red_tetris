import React from 'react'
import { connect } from 'react-redux'

const JoinGame = ( props ) => {
    const {joinGame, room, user, gravity} = props
    if (room.start == false){
	    return (
	        <div className="" href="" onClick={()=>{
	            joinGame(room, user, gravity)
	            
	        }} style={{cursor : 'pointer'}}>Join game
	        </div>
	    )
	}else{
		return (<div></div>)
	}
  }
  
  export default JoinGame