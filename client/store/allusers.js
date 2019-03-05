import axios from 'axios'

// Acion Types
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const EDIT_USER = 'EDIT_USER'

// Action Creators
const getUsers = users => ({
  type: GET_USERS,
  users
})

const deleteUser = userId => ({
  type: DELETE_USER,
  userId
})

const editUser = user => ({
  type: EDIT_USER,
  user
})

// Initial State
const initialState = []

// Thunk Creators
export const fetchUsers = curPage => async dispatch => {
  try {
    const params = {
      page: curPage
    }
    const {data} = await axios.get('/api/users', {params})
    dispatch(getUsers(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeUserFromDB = userId => {
  return async dispatch => {
    try {
      const params = {
        id: userId
      }
      await axios.delete('/api/users/delete', {params})
      dispatch(deleteUser(Number(userId)))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUserInDB = (obj, id) => {
  return async dispatch => {
    try {
      const params = {id}
      const {data} = await axios.put('/api/users/edit/', obj, {params})
      dispatch(editUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const dispatchers = {
  [GET_USERS]: (state, action) => action.users,
  [DELETE_USER]: (state, action) => {
    const newUsers = state.filter(user => user.id !== action.userId)
    return newUsers
  },
  [EDIT_USER]: (state, action) => {
    const newUsers = state.map(user => {
      if (user.id === action.user.id) return action.user
      return user
    })
    return newUsers
  }
}

export default (state = initialState, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
