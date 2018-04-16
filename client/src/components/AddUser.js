import React from 'react'
import { connect } from 'react-redux'
import JoinGame from './JoinGame'
import StartNewGame from './StartNewGame'
import Button from '../containers/ButtonContainer'
//ne pas oublier le pb de l'id de la room lors de la creation de la nouvelle room
const  Center = (props) => {
    const {name, addUser, rooms, createGame, playerInfo, inGame, joinGame} = props
    const isLoggedIn = name != '' ? 1 : null;
    if (!isLoggedIn) {
        let input
        return (
            <div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                  return
                }
                addUser(input.value)
                input.value = ''
              }}>
                <input placeholder="Your pseudo" className="input-arrondi" ref={node => {
                  input = node
                }} />
              </form>
              <p className="gravity-enter">Press * keyword to reverse gravity.</p>
            </div>
          )
    } else if (!inGame){
      return ( 
        <div>
            {rooms.map(Game => (
                <div key={Game.game.id}>
                <p>id: {Game.game.id} </p>
                <p>Number of players: {Game.game.player.length} </p>
                
                <p>started: {Game.game.start == true ? 'yes' : 'no'} </p>
                <JoinGame key={Game.game.id} room={Game.game} createGame={createGame} user={name} joinGame={joinGame}/>            
                </div>
            ))}
            <br />
            <StartNewGame room={rooms.length} user={name}  createGame={createGame}/>
    <div className="Connected-rotate">
                <div className="space">{name}</div>
                <div>Connected</div>
            </div>
            </div>
            );
    }else{
      return (<Button />)
    }
    
  }


const AddUser = ( props ) => {
  const {addUser, username, rooms, createGame, playerInfo, inGame, joinGame} = props 
  return (
    <Center name = {username} addUser = { addUser } rooms = { rooms } createGame={createGame} playerInfo={playerInfo} inGame={inGame} joinGame={joinGame}/>
  )
}

export default AddUser