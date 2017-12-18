import { combineReducers } from 'redux'
import users from './users'
import count from './count'
import table from './table'
// import visibilityFilter from './visibilityFilter'

const userApp = combineReducers({
  users,
  count,
  table
})

export default userApp