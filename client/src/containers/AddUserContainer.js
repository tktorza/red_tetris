import AddUser from '../components/AddUser'
import  store  from '../index'
import { connect } from 'react-redux'
import { addUser, getAllRooms, createGame, createTableX, createTableY, inGame } from '../action/action'

import { } from '../action/action'

const mapStateToProps = (state) => {
        return  {
            username: state.UserReducer.get('user'),
            rooms: state.UserReducer.get('rooms'),
            playerInfo : state.buttonReducer.get('playerInfo'),
            inGame : state.UserReducer.get('inGame')        
        }
}

const mapDispatchToProps = (dispatch) => {
   return {
        addUser: (user) => {
            dispatch(addUser(user));
            dispatch(getAllRooms())
        },
        createGame: (game, user) => {
            dispatch(inGame())
            dispatch(createGame(game, user))
            for(let x = 0; x < 10; x++) {
                dispatch(createTableX(x))
               
            }
            for (let y = 0; y < 20; y++){
                dispatch(createTableY(y))
            }
        }
   }
}

const AddUserContainer = connect(
        mapStateToProps,
        mapDispatchToProps
)(AddUser)

export default AddUserContainer