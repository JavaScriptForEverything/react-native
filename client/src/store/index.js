import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authenticateUser } from './middlewares'

import productReducer from './productReducer'
import userReducer from './userReducer'
import paymentReducer from './paymentReducer'


const reducer = combineReducers({
  product: productReducer,
  user: userReducer,
  payment: paymentReducer
})

export default configureStore({ 
  reducer,
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware(),
  //   authenticateUser
  // ]
})