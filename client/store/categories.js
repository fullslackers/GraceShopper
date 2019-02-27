import axios from 'axios'

// Acion Types
const GET_CATEGORIES = 'GET_CATEGORIES'

// Action Creators
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

// Initial State
const initialState = []

// Thunk Creators
export const fetchCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/categories')
    dispatch(getCategories(data))
  } catch (error) {
    console.log(error)
  }
}

const dispatchers = {
  [GET_CATEGORIES]: (state, action) => action.categories
}

export default (state = initialState, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
