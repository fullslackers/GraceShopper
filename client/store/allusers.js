import axios from 'axios'

// Acion Types
const GET_USERS = 'GET_USERS'

// Action Creators
const getUsers = users => ({
  type: GET_USERS,
  users
})

// Initial State
const initialState = []

// Thunk Creators
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (error) {
    console.log(error)
  }
}

const dispatchers = {
  [GET_USERS]: (state, action) => action.users
}

export default (state = initialState, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
