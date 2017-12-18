import React from 'react'
import { connect } from 'react-redux'
import addUser, {incId} from '../actions'
import '../App.css'

const AddUser = ( state, dispatch ) => {
  // console.log("fwfefstate : " + state);
  // console.log(state.dispatch)
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        state.dispatch(addUser(input.value, state.count.id));
        state.dispatch(incId(state.count.id));
        input.value = ''
      }}>
        <input placeholder="Your pseudo" className="input-arrondi" ref={node => {
          input = node
        }} />
        {/* <button type="submit">
          Add User
        </button> */}
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)