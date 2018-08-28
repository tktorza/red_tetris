import React from 'react'
import JoinGame from './JoinGame'
import StartNewGame from './StartNewGame'
import Button from '../containers/ButtonContainer'
import {styles} from '../styles'

let gravity = 1

const AddUser = ( props ) => {
  const {addUser, username, rooms, createGame, playerInfo, inGame, joinGame} = props 
  const isLoggedIn = username != '' ? 1 : null;
  const getGravity = () => {
      gravity = 0
  }
  if (!isLoggedIn) {
      let input
      return (
        <div>
          <p style={styles.WelcomeText}>Welcome to RedTetris</p>

            <div style={styles.flexStyle}>
              <div style={styles.AppCentreContainer}>

                <div >
                  <form onSubmit={e => { e.preventDefault(); if (!input.value.trim()) { return; } addUser(input.value); input.value = ''}} >
              <input placeholder="Your pseudo" className="input-arrondi" ref={node => {
                input = node
              }} style={styles.formAddUser}/>
            </form>
          
            <div className="radio" style={{marginTop:"10%"}}>
              <label>
                Reverse gravity :
                <input type="radio" onClick={getGravity} style={{marginLeft:"2%"}}/>
              </label>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
  } else if (!inGame){
    return ( 
    <div style={styles.JoinGame}>
      <p style={styles.WelcomeText}>Choose game</p>

      <div style={styles.flexStyle}>
        <div >
          {rooms.map(Game => (
              <div key={Game.game.id}>
              <p>id: {Game.game.id} </p>
              <p>Number of players: {Game.game.player.length} </p>
              
              <p>started: {Game.game.start == true ? 'yes' : 'no'} </p>
              <JoinGame key={Game.game.id} room={Game.game} createGame={createGame} user={username} joinGame={joinGame} gravity={gravity}/>            
              </div>
          ))}
          <br />
         
      </div>
      <div style={styles.StartNewGame}>
        <div className="space">{username}</div>
        <StartNewGame room={rooms.length} user={username}  createGame={createGame} gravity={gravity}/>
      </div>
      </div>
    </div>
          );
  }else{
    return (<Button />)
  }

}

export default AddUser