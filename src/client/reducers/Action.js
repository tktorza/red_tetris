import { combineReducers } from 'redux'
import buttonReducer from './ButtonReducer'
import otherTableReducer from './OtherTableReducer'
 
export default combineReducers({
  buttonReducer,
  otherTableReducer,
}) 