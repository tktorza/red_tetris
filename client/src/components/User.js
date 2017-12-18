import React from 'react'
import PropTypes from 'prop-types'

export const User = ( props ) => {
  return (
    <li>
    {props.text}
  </li>
  )
 
}

/*User.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
}*/