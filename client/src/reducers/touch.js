const touch = (state = [], action) => {
    switch (action.type) {
      case 'TO_LEFT':
        return {
            table: action.table,
            piece: action.piece
        }
      default:
        return state
    }
  }
  
  export default touch