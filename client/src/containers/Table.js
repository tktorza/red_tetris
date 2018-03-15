import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable, reloadPiece, movePieceFDP } from '../actions'
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
        console.log(piece);
        
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
let oki = 0;

function keyDownDown(state){
    console.log('keyDonwDown', state)
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

const IntervalDown = ({evt, state}) => {
    console.log("IntervalDown -->", state);
    setTimeout(evt, 1000)
    return (null)
}

// const IntervalDownConnected = connect(mapStateToProps)(IntervalDown)

const KeyDown = (state, dispatch, evt) => {
    let typeTable = ['carre', 'L', 'ReverseL', 'Line', 'ReverseZ', 'Z', 'T'];
    let piece = {};
    piece.x = state.piece[0].x;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    piece.coords = [];
    // console.log(evt.keyCode);
    // if (evt.keyCode == 83 && oki == 0){
    //     setInterval(() => {
    //         console.log('Hi kiss');
    //         IntervalDownConnected()
    //     }, 1000);
    //     oki = 1;
    // }
    if (evt.keyCode == 80){
        piece.type = typeTable[i++ % 7];
        pushPieceToTable(piece, state);
    }
    if (evt.keyCode == 40) {
        // goDown(state, dispatch);

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

    console.log('update Table component')
    
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        KeyDown(state, dispatch, evt);
    }

    let table = {};
    if (!state.table[0])
        table = initTable(state);
    else {
        table = state.table[0];
    }
    // let i = 0;
    return (
        <div className="boardFull">
   
        <IntervalDown evt={ () => keyDownDown(state) } state={state}/>
            {table ? table.cols.map((col, key) => {
            //   if (i == 0){
            //     setTimeout(()=>{
            //         if (!state.table[0])
            //             keyDownDown(state);
            //         }, 1000);
            //         i = 1;
            //   }  
                return (<Column key={key} col={col} />)
            }) : 0}
        </div>
    )
    
}
let start = false
const mapStateToProps = (state) => {
    console.log('STAET +>',state)
    if(state.piece && !start) {

    }
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)