import { coordsObject, giveCoords, makeRotation, notInThisPiece, isOk, pieceMove } from '../components/Coords'

const addUser = (text, id) => ({
  type: 'ADD_USER',
  id: id,
  text
})

export const incId = (id) => ({
  type: 'INC_ID',
  id: id + 1,
})

export const reloadTable = (table) => ({
  type: 'RELOAD_TABLE',
  table,
})

export const newPiece = (piece) => ({
  type: 'NEW_PIECE',
  piece,
})

export const reloadPiece = (piece, table) => {
  // console.log("DISPATCH----->0");
  
  return dispatch => {
    // console.log("DISPATCH----->1");
    dispatch({
      type: 'RELOAD_PIECE',
      piece,
    })
  dispatch({
    type: 'RELOAD_TABLE',
    table,
  });  
  }}

export const henri = (piecePrev, table) =>{
return dispatch => {
  let piece = {};
  piece.x = piecePrev.x;
  piece.y = piecePrev.y;
  piece.className = piecePrev.className;
  piece.type = piecePrev.type;
  piece.rotation = piecePrev.rotation;
  piece.coords = [];
  piece.y = piecePrev.y + 1;
  let ok = 1;
  giveCoords(piece).then(c => {
    for (let i = 0; i < 4; i++) {
        if (c[i] && c[i].x >= 0 && c[i].x < 10 && c[i].y >= 0 && c[i].y < 20)
            piece.coords.push(c[i]);
        else
            ok = 0;
    }
    if (ok == 1) {
        pieceMove(table, piecePrev, c).then(table => {
            if (table != null) {
              console.log('ready to dispatch');
              dispatch({
                type: 'HENRI',
                piece,
              })
            dispatch({
              type: 'RELOAD_TABLE',
              table,
            });
            }
        });
    }
})
    
}}
export default addUser