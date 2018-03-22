import React from 'react'
import PropTypes from 'prop-types'
import Table, { pushPieceToTable } from '../containers/Table'
import { connect } from 'react-redux'
import { reloadTable, henri } from '../actions'
import functional from 'react-functional'

function initTable(state) {
    let table = {};
    let className = '';
    table.cols = [];
    for (let x = 0; x < 10; x++) {
        table.cols[x] = { lines: [], key: x };
        for (let y = 0; y < 20; y++) {
            for (let i = 0; i < 4; i++) {
                if (state.piece[0].coords[i].x == x && state.piece[0].coords[i].y == y) {
                    className = "color-blue";
                }
            }
            table.cols[x].lines[y] = { className: className, key: y };
            className = "";
        }
    }
    state.dispatch(reloadTable(table));
    return (table);
}

const Connected = (props, state, dispatch) => {
    console.log("Connected Appears");
    if (!props.table[0])
        initTable(props);
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
let okii = 0;

Connected.componentWillMount = (state) => {
    console.log(state);
    setInterval(() => {
        // console.log('PIECEEEEEE', state.piece);
        let piece = {};
        piece.x = state.piece[0].x;
        piece.y = state.piece[0].y;
        piece.className = state.piece[0].className;
        piece.type = state.piece[0].type;
        piece.rotation = state.piece[0].rotation;
        piece.coords = [];
        piece.y = state.piece[0].y + okii++;
        pushPieceToTable(piece, state);
        // state.dispatch(henri(state.piece[0], state.table[0]))
    }, 1000);
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(functional(Connected))
