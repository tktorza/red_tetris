import React from 'react'
import PropTypes from 'prop-types'
import { Column } from './Column'

export const Line = (props) => {
  return (

    <div className="board">
      {props.line.cols.map((col, key) => {
        return (
          <Column key={key} col={col} />
        )
      })}
    </div>
  )

}
