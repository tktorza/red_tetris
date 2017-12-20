import { combineReducers } from 'redux'
import users from './users'
import count from './count'
import table from './table'
import touch from './touch'
import piece from './piece'
// import visibilityFilter from './visibilityFilter'

const userApp = combineReducers({
  users,
  count,
  table,
  touch,
  piece
})

export default userApp