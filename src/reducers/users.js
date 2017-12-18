const users = (state = [], action) => {
    switch (action.type) {
      case 'ADD_USER':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      default:
        return state
    }
  }
  
  export default users