import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authenticateUser } from './middlewares'

import productReducer from './productReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  product: productReducer,
  user: userReducer
})

export default configureStore({ 
  reducer,
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware(),
  //   authenticateUser
  // ]
})