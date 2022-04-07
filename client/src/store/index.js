import { configureStore, combineReducers } from '@reduxjs/toolkit'

import productReducer from './productReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  product: productReducer,
  user: userReducer
})

export default configureStore({ reducer })