function createTable(){
  let table = {};
  let className = '';
  table.cols = [];
  for (let x = 0; x < 10; x++) {
      table.cols[x] = { lines: [], key: x };
      for (let y = 0; y < 20; y++) {
          table.cols[x].lines[y] = { className: className, key: y };
          className = "";
      }
  }
  return table
}

const table = (state = [createTable()], action) => {
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