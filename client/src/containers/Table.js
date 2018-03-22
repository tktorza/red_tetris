import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable, reloadPiece, movePieceFDP,henri } from '../actions'
import { fromJS } from 'immutable'
// import {createReactClass} from 'create-react-class' 
import functional from 'react-functional'
import AddUser from './AddUser';
import { coordsObject, giveCoords, makeRotation, notInThisPiece, isOk, pieceMove } from '../components/Coords'
// import { timeOutSolutionConnected} from "./TimeOutSolution";

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

export function pushPieceToTable(piece, state){
    let ok = 1;
    giveCoords(piece).then(c => {
        // console.log("pushPieceToTable", piece);
        
        for (let i = 0; i < 4; i++) {
            if (c[i] && c[i].x >= 0 && c[i].x < 10 && c[i].y >= 0 && c[i].y < 20)
                piece.coords.push(c[i]);
            else
                ok = 0;
        }
        if (ok == 1) {
        // console.log("pushPieceToTable--->2", state.table[0], state.piece[0], c);
     console.log('DIFFFFFFF--->', state.piece[0], piece)
            pieceMove(state.table[0], state.piece[0], c).then(table => {
                console.log("TABLEEEEEEEEE---->", c)
                if (table != null) {
        console.log("pushPieceToTable--->3", piece);
        
                    state.dispatch(reloadPiece(piece, table));
                    // state.dispatch(reloadTable(table));
                }
            });
        }
    })
}

let i = 0;
function keyDownDown(state){
    console.log('keyDownDown', state)
    if (state && state.table && state.table[0]){
        console.log('guten tag')
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

// cons/*t timeOutSolut*/ ionConnected = (state) => {
//     console.log('ENTERRRRRRRRRRRRRR');
//     keyDownDown(state);
// }

// const timeOutSolutionConnected = connect(ma/*pStateToProps)*/ (timeOutSolutionConnected);


const IntervalDown = ({evt, state}) => {
    console.log("IntervalDown -->");
    setTimeout(evt, 1000)
    return (null)
}


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

const timeOutSolution = (state, dispatch) => {
    console.log('ENTERRRRRRRRRRRRRR');
    keyDownDown(state);
    return(null)
}

const timeOutSolutionConnected = connect(mapStateToProps, mapDispatchToProps)(timeOutSolution)

const Table = (state, dispatch) => {
    console.log('update Table component')
    
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        KeyDown(state, dispatch, evt);
    }
    if (!state.table[0])
        initTable(state);
    return (
        <div className="boardFull">
        {/* <IntervalDown evt={()=> {}}state={state}/> */}
            {state.table[0] ? state.table[0].cols.map((col, key) => {
                return (<Column key={key} col={col} />)
            }) : 0}
        </div>
    )
}

Table.componentWillMount = (state) => {
    if (!state.table[0])
        initTable(state);
}

Table.componentDidMount = (props) => {
    // console.log("HELOOOOOOOOOOOO, ", props);
    // setInterval(() => {
    //     console.log('PIECEEEEEE', props.piece);
    //    props.dispatch(henri(props.piece[0], props.table[0]))
    //  }, 1000);
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(functional(Table))