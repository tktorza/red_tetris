import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable, reloadPiece } from '../actions'
import { fromJS } from 'immutable'
import AddUser from './AddUser';
import { coordsObject, giveCoords, makeRotation, notInThisPiece, isOk, pieceMove } from '../components/Coords'

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

function pushPieceToTable(piece, state){
    let ok = 1;
    giveCoords(piece).then(c => {

        for (let i = 0; i < 4; i++) {
            if (c[i] && c[i].x >= 0 && c[i].x < 10 && c[i].y >= 0 && c[i].y < 20)
                piece.coords.push(c[i]);
            else
                ok = 0;
        }
        if (ok == 1) {
            pieceMove(state.table[0], state.piece[0], c).then(table => {

                if (table != null) {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));
                }
            });
        }
    })
}

let i = 0;

const KeyDown = (state, dispatch, evt) => {
    let typeTable = ['carre', 'L', 'ReverseL', 'Line', 'ReverseZ', 'Z', 'T'];
    let piece = {};
    piece.x = state.piece[0].x;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    piece.coords = [];
    if (evt.keyCode == 80){
        piece.type = typeTable[i++ % 7];
        pushPieceToTable(piece, state);
    }
    if (evt.keyCode == 40) {
        piece.y = state.piece[0].y + 1;
        pushPieceToTable(piece, state);
    } else if (evt.keyCode == 38) {
        piece.rotation = (state.piece[0].rotation + 90) % 360;
        pushPieceToTable(piece, state);
    } else if (evt.keyCode == 37) {
        piece.x = state.piece[0].x - 1;
        pushPieceToTable(piece, state);
    } else if (evt.keyCode == 39) {
        piece.x = state.piece[0].x + 1;
        pushPieceToTable(piece, state);
    }
}

const Table = (state, dispatch) => {

    document.onkeydown = (evt) => {
        evt = evt || window.event;
        KeyDown(state, dispatch, evt);
    }

    let table = {};
    if (!state.table[0])
        table = initTable(state);
    else
        table = state.table[0];
    return (
        <div className="boardFull">
            {table ? table.cols.map((col, key) => {
                return (<Column key={key} col={col} />)
            }) : 0}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
