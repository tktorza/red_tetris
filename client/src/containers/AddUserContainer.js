import AddUser from '../components/AddUser'
import  store  from '../index'
import { connect } from 'react-redux'
import { addUser, getAllRooms, createGame } from '../action/action'

import { } from '../action/action'

const mapStateToProps = (state) => {
        return  {
            username: state.UserReducer.get('user'),
            rooms: state.UserReducer.get('rooms'),
            playerInfo : state.buttonReducer.get('playerInfo'),            
        }
}

const mapDispatchToProps = (dispatch) => {
   return {
        addUser: (user) => {
            dispatch(addUser(user));
            dispatch(getAllRooms())
        },
        createGame: (game, user) => {
            dispatch(createGame(game, user))
        }
   }
}

const AddUserContainer = connect(
        mapStateToProps,
        mapDispatchToProps
)(AddUser)

export default AddUserContainer