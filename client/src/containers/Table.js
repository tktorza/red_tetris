import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable, reloadPiece } from '../actions'
import { fromJS } from 'immutable'
import AddUser from './AddUser';

function initTable(state) {
    let table = {};
    table.cols = [];
    for (let x = 0; x < 10; x++) {
        table.cols[x] = { lines: [], key: x };
        for (let y = 0; y < 20; y++) {
            if ( (y == state.piece[0].y && (x == state.piece[0].x + 1 || x == state.piece[0].x) ) || (y == state.piece[0].y + 1 && (x == state.piece[0].x + 1 || x == state.piece[0].x) ) ) {
                table.cols[x].lines[y] = { className: "color-blue", key: y };
            } else {
                table.cols[x].lines[y] = { className: "", key: y };
            }
        }
    }
    state.dispatch(reloadTable(table));
    return table;
}

function coordsObject(prev, nuevo) {
    let coords = [];
    console.log(prev);
    coords.del = prev;
    coords.add = nuevo;
    console.log("coordsObject", coords);
    
    for (let i = 0; i < 4; i++) {
      for (let y = 0; y < 4; y++) {
          console.log("boucle::: ", prev.i, nuevo.y);
        if (prev["coord"+i] && nuevo["coord"+y] 
            && (prev["coord"+i].x == nuevo["coord"+y].x && prev["coord"+i].y == nuevo["coord"+y].y)) {
          console.log(prev["coord"+i].x, prev["coord"+i].y, " == ", nuevo["coord"+y].x, nuevo["coord"+y].y);
          
                coords.del["coord"+i] = null;
          coords.add["coord"+y] = null;
          console.log("if");
        }
      }
    }
    console.log("final: ", coords);
    //add --> to delete | del --> to add
    return coords;
  }
  
  function takeCoords(piece) {
    return new Promise((resolve, reject) => {
        let incx = piece.x + 1;
        let incy = piece.y + 1;
      let tab ={
        coord0:{x: piece.x, y:piece.y},
        coord1:{x: incx, y:piece.y},
        coord2:{x:piece.x, y:incy},
        coord3:{x:incx, y:incy}
    };
    console.log("EXACT:::::", tab);
        resolve(tab);
   })
  }
  
  function giveCoords(piece){
    return new Promise((resolve, reject) => {
        let p = {};
        /*switch (piece.type){
            case 'carre':
                p[0] = {x: piece.x, y: piece.y};
                p[1] = {x: piece.x + 1, y: piece.y};
                p[2] = {x: piece.x, y: piece.y+1};
                p[3] = {x: piece.x+1, y: piece.y+1};
                resolve(p);
                break;
            case 'L':
                p[0] = {x: piece.x, y: piece.y};
                p[1] = {x: piece.x , y: piece.y + 1};
                p[2] = {x: piece.x, y: piece.y+2};
                p[3] = {x: piece.x+1, y: piece.y+2};
                resolve(p);
                break;
            default:
                resolve(null);
                break;
        }*/
        if (piece.type == 'carre'){
            p[0] = {x: piece.x, y: piece.y};
            p[1] = {x: piece.x + 1, y: piece.y};
            p[2] = {x: piece.x, y: piece.y+1};
            p[3] = {x: piece.x+1, y: piece.y+1};
             resolve(p);
        }else if (piece.type == 'L'){
            p[0] = {x: piece.x, y: piece.y};
            p[1] = {x: piece.x, y: piece.y - 1};
            p[2] = {x: piece.x, y: piece.y - 2};
            p[3] = {x: piece.x + 1, y: piece.y};
             resolve(p);
            }
        else if (piece.type){
            resolve(null)
        }
    })
  }

  function whichPosition(coords, piece){
    switch (coords) {
        case {x: piece.x, y: piece.y + 1}:
            return 'bottom';
        case {x: piece.x, y: piece.y - 1}: 
            return 'top';
        case {x: piece.x + 1, y: piece.y}: 
            return 'right';
        case {x: piece.x - 1, y: piece.y}: 
            return 'left';
        case {x: piece.x - 1, y: piece.y + 1}: 
            return 'BL';
        case {x: piece.x + 1, y: piece.y + 1}: 
            return 'BR';
        case {x: piece.x + 1, y: piece.y - 1}: 
            return 'TR';
        case {x: piece.x - 1, y: piece.y - 1}: 
            return 'TL';
        default: 
            return '';
    }
  }

  function makeRotation (piece) {
    //return de coords...
    return new Promise((resolve, reject) => {
        giveCoords(piece).then(coords => {
            piece.x, piece.y
            let newPiece = {};
            for (let i = 0;i < 4;i++){
                switch (whichPosition(coords[i], piece)) {
                    case 'bottom':
                        newPiece[i] = {x: piece.x + 1, y: piece.y + 1};
                    case 'top': 
                        newPiece[i] = {x: piece.x - 1, y: piece.y - 1};
                    case 'right': 
                        newPiece[i] = {x: piece.x + 1, y: piece.y - 1};
                    case 'left': 
                        newPiece[i] = {x: piece.x - 1, y: piece.y + 1};
                    case 'BL': 
                        newPiece[i] = {x: piece.x + 2, y: piece.y};
                    case 'BR': 
                        newPiece[i] = {x: piece.x, y: piece.y + 2};
                    case 'TR': 
                        newPiece[i] = {x: piece.x - 2, y: piece.y};
                    case 'TL': 
                        newPiece[i] = {x: piece.x, y: piece.y - 2};
                    default: 
                        newPiece[i] = {x: piece.x, y: piece.y};
                }
            }
            resolve(newPiece);
        });
    });
  }

  function notInThisPiece(piece, coords){
    for (let i= 0;i < 4;i++){
        if (piece[i].x == coords.x && piece[i].y == coords.y)
            return -1;
    }
    return 1;
  }

  function isOk(piecePrev, piece, table) {
    // table.cols[piece.y - 1].lines[piece.x];
    //carre
    return new Promise((resolve, reject) => {
        giveCoords(piecePrev).then(prev => {
            if (prev){
                giveCoords(piece).then(p => {
                    if (p){
                        console.log(p);
                        for (let i= 0;i < 4;i++){
                            if (notInThisPiece(prev, p[i]) == 1 && table.cols[p[i].x].lines[p[i].y].className != ""){
                                    resolve(-1);
                            }
                        }
                        resolve(1);
                    }
                    resolve(-1);
                });
            }
        });
    });
  }

function pieceMove(table, piecePrev, pieceNew) {
      return new Promise((resolve, reject) => {
        let tableNew = table;
        takeCoords(piecePrev).then(response => {
          takeCoords(pieceNew).then(resNew => {
            let coords = coordsObject(response, resNew);
            console.log("coords", coords);
            console.log("prev table",tableNew);
            for (let i = 0;i < 4;i++){
                if (coords.del["coord"+i]){
                    console.log("data del add", tableNew.cols[coords.del["coord"+i].x].lines[coords.del["coord"+i].y], coords.del["coord"+i], coords.add["coord"+i])
                    tableNew.cols[coords.del["coord"+i].x].lines[coords.del["coord"+i].y].className = '';
                }
                if (coords.add["coord"+i])
                    tableNew.cols[coords.add["coord"+i].x].lines[coords.add["coord"+i].y].className = pieceNew.className;
            }
            console.log("tableNew",tableNew);
            resolve(tableNew);
          })
        });
      })
    
    
  }
  
  function pushToLeft(state){
    let piece = {};
    piece.x = state.piece[0].x - 1;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    let table = state.table[0];
    if (state.piece[0].x > 0){
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                pieceMove(state.table[0], state.piece[0], piece).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
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
    let table = state.table[0];
    if (state.piece[0].x + 2 < 10) {
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                pieceMove(state.table[0], state.piece[0], piece).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
                });
            }
        });
    }
  }

  function pushToBottom(state) {
    let piece = {};
    piece.x = state.piece[0].x;
    piece.y = state.piece[0].y + 1;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    let table = state.table[0];
    if (state.piece[0].y + 2 < 20) {
        isOk(state.piece[0], piece, state.table[0]).then(p => {
            if (p == 1){
                pieceMove(state.table[0], state.piece[0], piece).then(table => {
                    state.dispatch(reloadPiece(piece));
                    state.dispatch(reloadTable(table));      
                });
            }
        })
    }
  }

const KeyDown = (state, dispatch, evt) => {
    if (evt.keyCode == 40){
        pushToBottom(state);
    }else if (evt.keyCode == 38){
      // toTop
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
