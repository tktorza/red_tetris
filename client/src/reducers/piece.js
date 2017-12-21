const piece = (state = [], action) => {
    switch (action.type) {
      case 'NEW_PIECE':
        return {
            0: action.piece
        }
      case 'RELOAD_PIECE':
        return [
          action.piece
        ]
      case 'TO_RIGHT':
        return [
          action.piece
        ]
      case 'TO_BOTTOM':
        return [
          action.piece
        ]
      default:
        return state
    }
  }

  export default piece
  
  