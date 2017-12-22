import PropTypes from 'prop-types'
import React from 'react'


export function coordsObject(prev, nuevo) {
    let coords = [];
    // console.log(prev);
    coords.push(prev);
    coords.push(nuevo);
    return new Promise((resolve, reject) => {
    for (let i = 0; i < 4; i++) {
        for (let y = 0; y < 4; y++) {
          if (prev[i] && nuevo[y] 
              && (prev[i].x === nuevo[y].x && prev[i].y === nuevo[y].y)) {
            coords[0][i] = null;
            coords[1][y] = null;
          }
        }
      }
      console.log("COORDSS:: ", coords);
      resolve(coords);
    });
   
  }

  
export  function giveCoords(piece){
    return new Promise((resolve, reject) => {
        let p = [];
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
        if (piece.type === 'carre'){
            p[0] = {x: piece.x, y: piece.y};
            p[1] = {x: piece.x + 1, y: piece.y};
            p[2] = {x: piece.x, y: piece.y+1};
            p[3] = {x: piece.x+1, y: piece.y+1};
             resolve(p);
        }else if (piece.type === 'L'){
            p[0] = {x: piece.x, y: piece.y};
            p[1] = {x: piece.x, y: piece.y - 1};
            p[2] = {x: piece.x, y: piece.y - 2};
            p[3] = {x: piece.x+1, y: piece.y};
             resolve(p);
            }
        else if (piece.type){
            resolve(null)
        }
    })
  }

export  function whichPosition(coords, piece){
        if (coords.x === piece.x && coords.y === piece.y + 1)
            return 'bottom';
        else if (coords.x === piece.x && coords.y === piece.y - 1) 
            return 'top';
        else if (coords.x === piece.x + 1 && coords.y === piece.y) 
            return 'right';
        else if (coords.x === piece.x - 1 && coords.y === piece.y) 
            return 'left';
        else if (coords.x === piece.x - 1 && coords.y === piece.y + 1) 
            return 'BL';
        else if (coords.x === piece.x + 1 && coords.y === piece.y + 1) 
            return 'BR';
        else if (coords.x === piece.x + 1 && coords.y === piece.y - 1) 
            return 'TR';
        else if (coords.x === piece.x - 1 && coords.y === piece.y - 1) 
            return 'TL';
        else 
            return '';
  }

export  function makeRotation (piece) {
    //return de coords...
    return new Promise((resolve, reject) => {
        giveCoords(piece).then(coords => {
            // piece.x, piece.y
            console.log(coords);
            let newPiece = {};
            let compare = '';
            for (let i = 0;i < 4;i++){
                compare = whichPosition(coords[i], piece);
                console.log(compare);
                switch (compare) {
                    case 'bottom':
                        newPiece[i] = {x: piece.x + 1, y: piece.y + 1};
                        break;
                    case 'top': 
                        newPiece[i] = {x: piece.x - 1, y: piece.y - 1};
                        break;
                    case 'right': 
                        newPiece[i] = {x: piece.x + 1, y: piece.y - 1};
                        break;
                    case 'left': 
                        newPiece[i] = {x: piece.x - 1, y: piece.y + 1};
                        break;
                    case 'BL': 
                        newPiece[i] = {x: piece.x + 2, y: piece.y};
                        break;
                    case 'BR': 
                        newPiece[i] = {x: piece.x, y: piece.y + 2};
                        break;
                    case 'TR': 
                        newPiece[i] = {x: piece.x - 2, y: piece.y};
                        break;
                    case 'TL': 
                        newPiece[i] = {x: piece.x, y: piece.y - 2};
                        break;
                    default:
                        console.log("default");   
                        newPiece[i] = {x: piece.x, y: piece.y};
                }
            }
            console.log("new piece", newPiece);
            resolve(newPiece);
        });
    });
  }

export  function notInThisPiece(piece, coords){
    for (let i= 0;i < 4;i++){
        if (piece[i].x === coords.x && piece[i].y === coords.y)
            return -1;
    }
    return 1;
  }

export  function isOk(piecePrev, piece, table) {
    // table.cols[piece.y - 1].lines[piece.x];
    //carre
    return new Promise((resolve, reject) => {
        giveCoords(piecePrev).then(prev => {
            if (prev){
                giveCoords(piece).then(p => {
                    if (p){
                        // console.log(p);
                        for (let i= 0;i < 4;i++){
                            if (notInThisPiece(prev, p[i]) === 1 && table.cols[p[i].x].lines[p[i].y].className !== ""){
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
  }export

function pieceMove(table, piecePrev, pieceNew) {
      return new Promise((resolve, reject) => {
		let tableNew = Object.assign({}, table);
		console.log("piecessssssss:", pieceNew, piecePrev)
            coordsObject(piecePrev.coords, pieceNew).then(coords => {
                for (let i = 0;i < 4;i++){
                    if (coords[0][i])
                        tableNew.cols[coords[0][i].x].lines[coords[0][i].y].className = '';
                    if (coords[1][i])
                        tableNew.cols[coords[1][i].x].lines[coords[1][i].y].className = piecePrev.className;
                }
                console.log("tableNew",tableNew);
                resolve(tableNew);
              })
      })
  }
  