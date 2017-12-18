import React from 'react'
import PropTypes from 'prop-types'

export const Connected = ( props ) => {
  return (
      <div className="Connected-rotate">
          <div className="space">{props.user}</div>
           <div>Connected</div>
      </div>
  )
}