import Axios from 'axios'
import store from './index'

// Action Types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART_UPON_LOGOUT = 'CLEAR_CART_UPON_LOGOUT'

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

export const clearCartUponLogout = () => ({
  type: CLEAR_CART_UPON_LOGOUT
})

// Thunks

export const fetchCart = () => async dispatch => {
  try {
    const {data: cart} = await Axios.get('/api/users/cart')
    if (cart && cart.length) {
      cart.forEach(product => {
        dispatch(addToCart(product))
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const postCart = async cart => {
  try {
    const isUser = Object.values(store.getState().currentUser).length
    if (isUser) await Axios.post('/api/users/cart', cart)
  } catch (error) {
    console.log(error)
  }
}
// Reducer

const initialState = []

const dispatchers = {
  [ADD_TO_CART]: (state, action) => {
    const cart = [...state]
    const foundItem = cart.find(item => item.id === action.product.id)
    if (foundItem) foundItem.quantity += action.product.quantity
    else cart.push(action.product)
    postCart(cart)
    return cart
  },
  [REMOVE_FROM_CART]: (state, action) => {
    const cart = [...state.filter(item => item.id !== action.product.id)]
    postCart(cart)
    return cart
  },
  [UPDATE_QUANTITY]: (state, action) => {
    if (action.opType === 'increment') {
      const cart = [
        ...state.map(item => {
          if (item.id === action.product.id) item.quantity++
          return item
        })
      ]
      postCart(cart)
      return cart
    }
    if (action.opType === 'decrement') {
      const cart = [
        ...state.map(item => {
          if (item.id === action.product.id) item.quantity--
          return item
        })
      ]
      postCart(cart)
      return cart
    }
  },
  [CLEAR_CART_UPON_LOGOUT]: (state, action) => initialState
}

export default (state = initialState, action) => {
  if (action.type in dispatchers) return dispatchers[action.type](state, action)
  return state
}
