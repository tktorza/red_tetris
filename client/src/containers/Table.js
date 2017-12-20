import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Column } from './Column'
import { reloadTable } from '../actions'
import { toLeft } from '../actions/index';
import { fromJS } from 'immutable'

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
  
  function isOk(piece, table) {
    // table.cols[piece.y - 1].lines[piece.x];
    //carre
    for (let i = piece.y; i < piece.y + 2; i++) {
      if (table.cols[i].lines[piece.x - 1].className != "")
        return (-1);
    }
    return (1);
  }
  
  function pieceMove(table, piecePrev, pieceNew) {
      return new Promise((resolve, reject) => {
        let tableNew = table;
        takeCoords(piecePrev).then(response => {
          takeCoords(pieceNew).then(resNew => {
            let coords = coordsObject(response, resNew);
            console.log("coords");
            console.log(coords);
            for (let i = 0;i < 4;i++){
                if (coords.del["coord"+i])
                    tableNew.cols[coords.del["coord"+i].y].lines[coords.del["coord"+i].x].className = pieceNew.className;
                if (coords.add["coord"+i])
                    tableNew.cols[coords.add["coord"+i].y].lines[coords.add["coord"+i].x].className = '';
            }
            console.log(tableNew);
            resolve(tableNew);
          })
        });
      })
    
    
  }
  
  function pushToLeft(state){
    let piece = {};
    piece.x = state.piece[0].x + 1;
    piece.y = state.piece[0].y;
    piece.className = state.piece[0].className;
    piece.type = state.piece[0].type;
    piece.rotation = state.piece[0].rotation;
    let table = state.table[0];
    if (state.piece[0].x > 0 && isOk(state.piece[0], state.table[0])) {
      piece.x = state.piece[0].x - 1;
      pieceMove(state.table[0], state.piece[0], piece).then(table => {
        state.dispatch(toLeft(piece, table));
      });
    }
  }

const KeyDown = (state, dispatch, evt) => {
    if (evt.keyCode == 40){
      // state.dispatch(toBottom(state));
    }else if (evt.keyCode == 38){
      // toTop
    }else if (evt.keyCode == 37){
        pushToLeft(state);
    //   state.dispatch(toLeft(state));
    }else if (evt.keyCode == 39){
      // toRight
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
