import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import currentUser from './SingleUser'
import users from './allusers'
const reducer = combineReducers({
  users,
  currentUser
})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true
    })
  )
)
const store = createStore(reducer, middleware)

export default store
// export * from './user'
