import React from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'

const UserList = (props) => {
    console.log("props =>", props)
    return (
        <ul>
            {props.users.map((user, key) => {
                return (<User
                    key={key}
                    text={user.text}
                />)
            })}
        </ul>
    )
}
const mapStateToProps = (state) => {
    return state
}
// const mapDispatchToProps = (dispatch) => {
//     return dispatch
// }
export default connect(mapStateToProps/*, mapDispatchToProps*/)(UserList)