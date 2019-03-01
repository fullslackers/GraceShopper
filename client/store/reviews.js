import axios from 'axios'

// ACTION TYPES
const SET_REVIEWS = 'SET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

// ACTION CREATORS
export const setReviews = allReviews => ({
  type: SET_REVIEWS,
  allReviews
})

export const addReview = newReview => ({
  type: ADD_REVIEW,
  newReview
})

// THUNK-TIONS
export const fetchReviews = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/reviews`)
    dispatch(setReviews(data))
  }
}

export const createReview = newReview => {
  return async dispatch => {
    const {data} = await axios.post('/api/products/reviews', newReview)
    dispatch(addReview(data))
  }
}

// THE REDUCER
const initialState = {
  allReviews: []
}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        allReviews: action.allReviews
      }
    case ADD_REVIEW:
      return {
        ...state,
        allReviews: [...state.allReviews, action.newReview]
      }
    default:
      return state
  }
}

export default reviewsReducer
