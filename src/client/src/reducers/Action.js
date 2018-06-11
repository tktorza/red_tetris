import { combineReducers } from 'redux'
import buttonReducer from './ButtonReducer'
import otherTableReducer from './OtherTableReducer'
import UserReducer from './UserReducer'
 
export default combineReducers({
  buttonReducer,
  otherTableReducer,
  UserReducer
}) 