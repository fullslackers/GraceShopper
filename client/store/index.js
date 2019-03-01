import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import currentUser from './SingleUser'
import users from './allusers'
import products from './products'
import categories from './categories'
import cart from './cart'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import orders from './orders'
import reviews from './reviews'

const reducer = combineReducers({
  users,
  currentUser,
  products,
  categories,
  cart,
  orders,
  reviews
})

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true
    })
  )
)

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, middleware)
export const persistor = persistStore(store)

export default store
export * from './SingleUser'
export * from './cart'
