import React from 'react'
import PropTypes from 'prop-types'
import { Line } from './Line'

export const Column = (props) => {
  return (
    <div className="board">
      {props.col.lines.map((line, key) => {
        return (
          <Line key={key} line={line} />
        )
      })}
    </div>
  )

}
