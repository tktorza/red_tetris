import { combineReducers } from 'redux'
import users from './users'
import count from './count'
// import visibilityFilter from './visibilityFilter'

const userApp = combineReducers({
  users,
  count
})

export default userApp