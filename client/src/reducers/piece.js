import { coordsObject, giveCoords, makeRotation, notInThisPiece, isOk, pieceMove } from '../components/Coords'

const piece = (state = [], action) => {
    switch (action.type) {
      case 'NEW_PIECE':
        return {
            0: action.piece
        }
      case 'RELOAD_PIECE':
      console.log("PIECE ACTU", action.piece);
      // let piece = {};
      // piece.x = state.x;
      // piece.y = state.y;
      // piece.className = state.className;
      // piece.type = state.type;
      // piece.rotation = state.rotation;
      // piece.coords = [];
      // piece.y = state.y + 1;
      for (let i=0;i<4;i++){
        action.piece.coords[i].y++;
      }
      action.piece.y++
      console.log("NEW PIECE ACTU", action.piece);
      
        return [
          action.piece
        ]
        case 'HENRI': {
          console.log("Henri", state)
          action.piece.y++
          return [
            action.piece
          ]
        }
      default:
        return state
    }
  }

  export default piece
  
  
