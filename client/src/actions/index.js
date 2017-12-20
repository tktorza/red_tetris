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
  table: table
})

export const newPiece = (piece) => ({
  type: 'NEW_PIECE',
  piece: piece
})

export const toLeft = (piece, table) => ({
      type: 'TO_LEFT',
      piece: piece,
      table: table
    })

export const toRight = (piece) => ({
  type: 'TO_RIGHT',
  piece: piece
})

export const toTop = (piece) => ({
  type: 'TO_TOP',
  piece: piece
})

export const toBottom = (piece) => ({
  type: 'TO_BOTTOM',
  piece: piece
})

export default addUser