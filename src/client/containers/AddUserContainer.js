import AddUser from '../components/AddUser'
import { connect } from 'react-redux'
import { addUser, getAllRooms, createGame, createTableX, createTableY, inGame, joinGame } from '../actions/action'

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
            console.log(user)
            dispatch(addUser(user));
            dispatch(getAllRooms())
        },
        createGame: (game, user, gravity) => {
            dispatch(inGame())
            dispatch(createGame(game, user))
            for(let x = 0; x < 10; x++) {
                    dispatch(createTableX(x))
            }
            if (gravity == 1){
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
            }else{
                 for (let y = 19; y >= 0; y--){
                    dispatch(createTableY(y))
                }
            }
        },
        joinGame : (game, user, gravity) => {
            dispatch(inGame())
            dispatch(joinGame(game, user))
            for(let x = 0; x < 10; x++) {
                dispatch(createTableX(x))
               
            }
             if (gravity == 1){
                for (let y = 0; y < 20; y++){
                    dispatch(createTableY(y))
                }
            }else{
                 for (let y = 19; y >= 0; y--){
                    dispatch(createTableY(y))
                }
            }
        }
   }
}

const AddUserContainer = connect(
        mapStateToProps,
        mapDispatchToProps
)(AddUser)

export default AddUserContainer