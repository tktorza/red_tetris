import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable, reloadPiece } from '../actions'
import { fromJS } from 'immutable'
import AddUser from './AddUser';
import {coordsObject, giveCoords, whichPosition, makeRotation, notInThisPiece, isOk, pieceMove } from '../components/Coords'

function initTable(state) {
    let table = {};
    let className = '';
    table.cols = [];
            for (let x = 0; x < 10; x++) {
                table.cols[x] = { lines: [], key: x };
                for (let y = 0; y < 20; y++) {
                    for (let i=0;i<4;i++){
                        if (state.piece[0].coords[i].x == x && state.piece[0].coords[i].y == y){
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


  function pushToLeft(state){
    let piece = {};
    piece.x = state.piece[0].x - 1;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    piece.coords = [];
    let table = state.table[0];
    if (state.piece[0].x > 0){
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                giveCoords(piece).then(c => {
                    for (let i=0;i<4;i++){
                        piece.coords.push(c[i]);
                    }
                    pieceMove(state.table[0], state.piece[0], c).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
                });
            });
            
            }
        })
    }
  }

  function pushToRight(state) {
    let piece = {};
    piece.x = state.piece[0].x + 1;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    piece.coords = [];
    let table = state.table[0];
    if (state.piece[0].x + 2 < 10) {
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                giveCoords(piece).then(c => {
                    for (let i=0;i<4;i++){
                        piece.coords.push(c[i]);
                    }
                    pieceMove(state.table[0], state.piece[0], c).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
                });
            });
            
            }
        })
    }
  }

  function pushToBottom(state) {
    let piece = {};
    piece.x = state.piece[0].x;
    piece.y = state.piece[0].y + 1;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    piece.coords = [];
    let table = state.table[0];
    if (state.piece[0].y + 2 < 20) {
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                giveCoords(piece).then(c => {
                    for (let i=0;i<4;i++){
                        piece.coords.push(c[i]);
                    }
                    pieceMove(state.table[0], state.piece[0], c).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
                });
            });
            
            }
        })
    }
  }

            
  function rotatePiece(state){
      console.log("ROTATE");
      makeRotation(state.piece[0]).then(newPiece => {
          console.log(newPiece);
        pieceMove(state.table[0], state.piece[0], newPiece).then(table => {
            console.log(table);      
            state.dispatch(reloadPiece(newPiece));
            state.dispatch(reloadTable(table));
        });
      });
  }

const KeyDown = (state, dispatch, evt) => {
    if (evt.keyCode == 40){
        pushToBottom(state);
    }else if (evt.keyCode == 38){
      // toTop
      rotatePiece(state);
    }else if (evt.keyCode == 37){
        pushToLeft(state);
    //   state.dispatch(toLeft(state));
    }else if (evt.keyCode == 39){
        pushToRight(state);
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
