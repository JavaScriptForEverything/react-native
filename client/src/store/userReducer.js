import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { catchAsyncDispatch, filterArrayObject } from '../util'

axios.defaults.baseURL = 'http://localhost/5000/api'

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',
    users: [],
    user: {}
  },
  reducers: {
    requested: (state, action) => ({
      ...state,                 // 1. copy entire store as it was
      loading: true,            // 2. only update loading: false => true to show loading effect
      error: ''                 // 3. empty error before any request, which will reset old error message
    }),
    failed: (state, action) => ({
      ...state, 
      loading: false,           // To stop loading effect
      error: action.payload     // make sure payload data MUST BE STRING, Object throw error
    })
  },
  getAllUsers: (state, action) => ({
    ...state,
    loading: false,

    // Method-1: Get Only required fields from HTTP respose which is JSON Object.
    users: action.payload.users,
    total: action.payload.total,

    // Method-2: Get Every thing just in single line, but it will override old fields if conflict.
    // ...action.payload                       // Don't Do this way, if not to override old fields
  })
})
export default reducer



/* dispatch( getProducts(filterObj={}) )       
**   - call inside dispatch so that inside getProducts have access (dispatch, getStore) methods 
**   
** Inside the Function: 
**    wrap the entire function inside catchAsyncDispatch() so that errors can handle
**    outside of the function in single place, no need try...catch again and again.
**   
** Used inside file:
*/ 
export const getUsers = ( params={} ) => catchAsyncDispatch( async (dispatch) => {
  dispatch( actions.requested() )   // enable loading effect by loading: true

  const { data } = await axios.get('/users', {  // axios.defaults.baseURL
    params: filterArrayObject(params, Object.keys(params), false)   // false: allowedFields
  })   
  dispatch( actions.getAllUsers(data) )
}, actions.failed)