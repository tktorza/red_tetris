/*export const pushUser = user => {
    return {
      type: 'PUSH_USER',
      user
    }
}*/
const addUser = (text, id) => ({
  type: 'ADD_USER',
  id: id,
  text
})

export const incId = (id) => ({
  type: 'INC_ID',
  id: id + 1,
})

export const reloadTable= (table) => ({
  type: 'RELOAD_TABLE',
  table: table
})

export default addUser