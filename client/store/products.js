import axios from 'axios'

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// ACTION CREATORS
export const setProducts = allProducts => ({
  type: SET_PRODUCTS,
  allProducts
})
export const selectProduct = selectedProduct => ({
  type: SELECT_PRODUCT,
  selectedProduct
})
export const addProduct = newProduct => ({
  type: ADD_PRODUCT,
  newProduct
})
export const editProduct = updatedProduct => ({
  type: EDIT_PRODUCT,
  updatedProduct
})
export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id
})

// THUNK-TIONS
export const fetchProducts = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  }
}

export const fetchSelectedProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(selectProduct(data))
  }
}

export const createProduct = newProduct => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', newProduct)
    dispatch(addProduct(data))
  }
}

export const updateProduct = (id, updatedProduct) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${id}`, updatedProduct)
    console.log(data)
    console.log(updatedProduct)
    dispatch(editProduct(data))
  }
}

export const deleteProduct = id => {
  return async dispatch => {
    await axios.delete(`/api/products/${id}`)
    dispatch(removeProduct(id))
  }
}

// THE REDUCER (It's time to reduce and chew bubblegum...and I'm all outta gum)
const initialState = {
  allProducts: [],
  selectedProduct: {}
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        allProducts: action.allProducts
      }
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.selectedProduct
      }
    case ADD_PRODUCT:
      return {
        ...state,
        // REVIEW: do we always want to add to the end?
        //         does this matter?
        allProducts: [...state.allProducts, action.newProduct]
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map(
          product =>
            action.updatedProduct.id === product.id
              ? action.updatedProduct
              : product
        )
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== action.id
        )
      }
    default:
      return state
  }
}

export default productsReducer
