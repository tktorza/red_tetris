const table = (state = [], action) => {
    switch (action.type) {
      case 'RELOAD_TABLE':
        return [
            action.table
        ]
      default:
        return state
    }
  }
  
  export default table