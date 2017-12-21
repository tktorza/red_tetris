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

export const reloadPiece = (piece) => ({
      type: 'RELOAD_PIECE',
      piece: piece
    })

export default addUser