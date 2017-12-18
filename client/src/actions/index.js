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

export default addUser