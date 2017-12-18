import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from './Line'
import {reloadTable} from '../actions'

function initTable(state){
    let table = {};
    table.lines = [];
    for (let x = 0;x < 10;x++){
        table.lines[x] = {cols: [], key: x};
        for (let y = 0;y < 20;y++){
            table.lines[x].cols[y] = {className: 
                ( ((x == 1) && (y == 5 || y == 6)) || ((y == 5) && (x == 2 || x == 3)) ) ? "color-blue" : "", key: y};
        }
    }
    state.dispatch(reloadTable(table));
    return table;
}

const Table = (state, dispatch) => {
    let table = {};
    if (!state.table[0])
        table = initTable(state);
    else
        table = state.table[0];
    return (
        <div className="boardFull">
        {table ? table.lines.map((line, key) => {
            return (<Line key={key} line={line} />)
        }) : 0}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {dispatch}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Table)
    