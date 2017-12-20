const piece = (state = [], action) => {
    switch (action.type) {
      case 'NEW_PIECE':
        return {
            0: action.piece
        }
      default:
        return state
    }
  }

  export default piece
  
  
