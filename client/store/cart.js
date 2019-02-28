// import axios from 'axios'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const MERGE_CART = 'MERGE_CART'
// const MERGE_CART = "MERGE_CART";

// Action Creators
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

export const updateQuantity = (product, opType) => ({
  type: UPDATE_QUANTITY,
  product,
  opType
})

export const mergeCart = cart => ({
  type: MERGE_CART,
  cart
})

// Thunks

// TODO: Thunk for merging carts stored on DB?

// Reducer

const initialState = []

const dispatchers = {
  [ADD_TO_CART]: (state, action) => {
    const cart = [...state]
    const foundItem = cart.find(item => item.id === action.product.id)
    if (foundItem) foundItem.quantity++
    else cart.push(action.product)
    return cart
  },
  [REMOVE_FROM_CART]: (state, action) => [
    ...state.filter(item => item.id !== action.product.id)
  ],
  [UPDATE_QUANTITY]: (state, action) => {
    if (action.opType === 'increment')
      return [
        ...state.map(item => {
          if (item.id === action.product.id) item.quantity++
          return item
        })
      ]
    if (action.opType === 'decrement')
      return [
        ...state.map(item => {
          if (item.id === action.product.id) item.quantity--
          return item
        })
      ]
  },
  [MERGE_CART]: (state, action) => [
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
