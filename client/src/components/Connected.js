import React from 'react'
import PropTypes from 'prop-types'
import Table from '../containers/Table'

export const Connected = ( props ) => {
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