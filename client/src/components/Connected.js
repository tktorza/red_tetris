import React from 'react'
import PropTypes from 'prop-types'
import Table from '../containers/Table'
import { connect } from 'react-redux'

const Connected = (props, state, dispatch) => {
    return (
        <div className='Connected'>
            <Table />
            <div className="Connected-rotate">
                <div className="space">{props.user}</div>
                <div>Connected</div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connected)
