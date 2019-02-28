import axios from 'axios'

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'
const SELECT_ORDER = 'SELECT_ORDER'
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'

// ACTION CREATORS
export const setOrders = allOrders => ({type: SET_ORDERS, allOrders})
export const selectOrder = selectedOrder => ({
  type: SELECT_ORDER,
  selectedOrder
})
export const setUserOrders = userOrders => ({type: SET_USER_ORDERS, userOrders})
export const addOrder = newOrder => ({type: ADD_ORDER, newOrder})
export const editOrder = updatedOrder => ({type: EDIT_ORDER, updatedOrder})

// THUNK-TIONS
export const fetchOrders = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/orders')
    dispatch(setOrders(data))
  }
}

export const fetchSelectedOrder = orderId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(selectOrder(data))
  }
}

export const fetchSelectedUserOrders = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/user/${userId}`)
    dispatch(setUserOrders(data))
  }
}

export const createOrder = newOrder => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders', newOrder)
    dispatch(addOrder(data))
  }
}

export const updateOrder = (id, updatedOrder) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/${id}`, updatedOrder)
    dispatch(editOrder(data))
  }
}

// REDUCER
const initialState = {
  allOrders: [],
  selectedOrder: {},
  userOrders: []
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, allOrders: action.allOrders}
    case SELECT_ORDER:
      return {...state, selectedOrder: action.selectedOrder}
    case SET_USER_ORDERS:
      return {...state, userOrders: action.userOrders}
    case ADD_ORDER:
      return {...state, allOrders: [...state.allOrders, action.newOrder]}
    case EDIT_ORDER:
      return {
        ...state,
        allOrders: state.allOrders.map(
          order =>
            action.updatedOrder.id === order.id ? action.updatedOrder : order
        )
      }
    default:
      return state
  }
}

export default ordersReducer
