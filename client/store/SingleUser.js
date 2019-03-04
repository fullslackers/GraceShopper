import axios from 'axios'
import history from '../history'
import {clearCartUponLogout, fetchCart} from './../store/cart'

// Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// Action Creators
const getUser = user => ({
  type: GET_USER,
  user
})
const removeUser = () => ({
  type: REMOVE_USER
})

// Initial State
const defaultUser = {}

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password
    })
  } catch (authError) {
    return dispatch(
      getUser({
        error: authError
      })
    )
  }

  try {
    dispatch(getUser(res.data))
    dispatch(fetchCart())
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(clearCartUponLogout())
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// Reducer
const dispatchers = {
  [GET_USER]: (state, action) => action.user,
  [REMOVE_USER]: (state, action) => defaultUser
}

export default (state = defaultUser, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
