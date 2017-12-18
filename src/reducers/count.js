const count = (state = {id: 0}, action) => {
    switch (action.type) {
      case 'INC_ID':
        return {
            id: action.id
        }
      default:
        return state
    }
  }
  
  export default count