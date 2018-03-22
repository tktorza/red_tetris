import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pushPieceToTable from './Table'

export function keyDownDown(state){
    console.log('keyDownDown', state)
    if (state && state.table && state.table[0]){
        let piece = {};
        piece.x = state.piece[0].x;
        piece.y = state.piece[0].y;
        piece.className = state.piece[0].className;
        piece.type = state.piece[0].type;
        piece.rotation = state.piece[0].rotation;
        piece.coords = [];
        piece.y = state.piece[0].y + 1;
        pushPieceToTable(piece, state);
    }
}

const timeOutSolution = (state, dispatch) => {
    console.log('ENTERRRRRRRRRRRRRR');
    keyDownDown(state);
    return(null)
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}


export const timeOutSolutionConnected = connect(mapStateToProps, mapDispatchToProps)(timeOutSolution)
