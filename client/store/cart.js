// import axios from 'axios'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'
// const MERGE_CART = "MERGE_CART";

// Action Creators
const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

// const mergeCart = cart => ({
//   type: MERGE_CART,
//   cart
// });

// Thunks

// TODO: Thunk for merging carts stored on DB?

// Reducer

const initialState = []

const dispatchers = {
  [ADD_TO_CART]: (state, action) => [...state, action.product],
  [REMOVE_FROM_CART]: (state, action) => [
    ...state.filter(item => item.id !== action.product.id)
  ],
  [UPDATE_CART]: (state, action) => [
    ...state.map(stateProduct => {
      action.cart.forEach(cartProduct => {
        if (cartProduct.id === stateProduct.id)
          stateProduct.quantity += cartProduct.quantity
      })
    })
  ]
}

export default (state = initialState, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
