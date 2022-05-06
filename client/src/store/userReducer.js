// import axios from 'axios'
import asyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { axios, catchAsyncDispatch, filterArrayObject } from '../util'

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',
    message: '',
    token: '',
    authenticated: '',
    user: {
      avatar: {},
    },
    users: [],
    isSignedUp: false,
    forgotPasswordMessage: '',
    resetPasswordMessage: '',

    products: [],                      // .find({ user: req.user._id })
    // images: [],
    // coverPhoto: {}
  },
  reducers: {
    requested: (state, action) => ({
      ...state,                 // 1. copy entire store as it was
      loading: true,            // 2. only update loading: false => true to show loading effect
      error: '',                // 3. empty error before any request, which will reset old error message
      message: ''               // reset product added/deleted/updated ...
    }),
    failed: (state, action) => ({
      ...state, 
      loading: false,           // To stop loading effect
      error: action.payload     // make sure payload data MUST BE STRING, Object throw error
    }),
    getAllUsers: (state, action) => ({
      ...state,
      loading: false,

      // Method-1: Get Only required fields from HTTP respose which is JSON Object.
      users: action.payload.users,
      total: action.payload.total,

      // Method-2: Get Every thing just in single line, but it will override old fields if conflict.
      // ...action.payload                       // Don't Do this way, if not to override old fields
    }),

    signedUp: (state, action) => ({
      ...state,
      loading: false,
      isSignedUp: action.payload,                // => { data: { status === 'success }}
    }),
    logedIn: (state, action) => ({
      ...state,
      loading: false,
      token: action.payload               // => { data: { token }}
    }),
    logedOut: (state, action) => ({
      ...state,
      loading: false,
      token: '',
      authenticated: false
    }),
    userGot: (state, action) => ({
      ...state,
      loading: false,
      user: action.payload.user,           // => { data: { user }}
      token: action.payload.token,         // update token from asyncStorage
      authenticated: true
    }),
    passwordForgotten: (state, action) => ({
      ...state,
      loading: false,
      forgotPasswordMessage: action.payload
    }),
    passwordReseted: (state, action) => ({
      ...state,
      loading: false,
      resetPasswordMessage: action.payload
    }),

    getAllUserProducts: (state, action) => ({
      ...state,
      loading: false,
      products: action.payload        // <= { data: { products }}
    }),

    addProduct: (state, action) => ({
      ...state,
      loading: false,
      message: 'product successfully added'
    })



  },  // end of reducers
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
// export const getUsers = ( params={} ) => catchAsyncDispatch( async (dispatch) => {
//   dispatch( actions.requested() )   // enable loading effect by loading: true

//   const { data } = await axios.get('/users', {
//     params: filterArrayObject(params, Object.keys(params), false)   // false: allowedFields
//   })
//   dispatch( actions.getAllUsers(data) )
// }, actions.failed)

// /src/screens/user/signup.js     => dispatch(signUpTo(fields))
export const signUpTo = (obj={}) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data: { status } } = await axios().post('/api/users/signup', obj )
  dispatch(actions.signedUp( status === 'success' ))
}, actions.failed)

// /src/screens/user/forgotPassword.js     => dispatch(sendForgotPasswordRequest(fields))
export const sendForgotPasswordRequest = (obj={}) => catchAsyncDispatch( async (dispatch) => {
  // if(!token) return console.log('No Token')

  dispatch(actions.requested())
  const { data: { message } } = await axios().post('/api/users/forgot-password', obj )
  dispatch(actions.passwordForgotten(message))
}, actions.failed)


// /src/screens/user/resetPassword.js     => dispatch(signUpTo(fields))
export const resetPassword = (obj={}) => catchAsyncDispatch( async (dispatch) => {
  // if(!token) return console.log('No Token')

  dispatch(actions.requested())
  const { data: { message } } = await axios().patch('/api/users/reset-password', obj )
  dispatch(actions.passwordReseted(message))
}, actions.failed)

// /src/screens/user/login.js     => dispatch(logOnTo(fields))
export const logOnTo = (obj={}) => catchAsyncDispatch( async (dispatch) => {
  dispatch(actions.requested())
  const { data: { token } } = await axios().post('/api/users/login', obj )
  dispatch(actions.logedIn( token ))

  /* asyncStorage return promise and if we try to await inside redux dispatch handler
  ** it throw error because redux Store only handler synchronous task
  **    - that's the reason use handle here instead of dispatch handler.  */ 
  await asyncStorage.setItem('token', token)

}, actions.failed)



// /src/screens/layout/index.js   => useEffect(() => token && dispatch(getMe(token)) , [token])
export const getMe = (token) => catchAsyncDispatch( async (dispatch) => {
  if(!token) return console.log('No Token')

  dispatch(actions.requested())
  const { data: { user }} = await axios(token).get('/api/users/me')
  dispatch(actions.userGot({ user, token }))
}, actions.failed)


export const logoutMe = (token) => async dispatch => {
  if(!token) return console.log('No Token')

  dispatch(actions.requested())
  dispatch(actions.logedOut())
  await asyncStorage.removeItem('token')
}



// screens/user/profile.js  => useEffect(() => dispatch(getAllUserProducts(token)), [token])
export const getAllUserProducts = (token) => catchAsyncDispatch( async (dispatch) => {
  if(!token) return console.log('No Token')

  const { data : { products } } = await axios(token).get('/api/users/user/all')
  dispatch(actions.getAllUserProducts(products))
}, actions.failed)


// screens/user/profile.js  => useEffect(() => dispatch(getAllUserProducts(token)), [token])
export const deleteProductById = (token, productId) => catchAsyncDispatch( async (dispatch, getState) => {
  if(!token || !productId) return console.log('No Token or productId')

  const products = getState().user.products.filter(product => product._id !== productId)
  dispatch(actions.getAllUserProducts(products))

  await axios(token).delete(`/api/products/${productId}`)

}, actions.failed)


export const createProduct = (token, data) => catchAsyncDispatch( async (dispatch) => {
  if(!token) return console.log('No Token')

  dispatch(actions.requested())
  const { data : { product }} = await axios(token).post('/api/products', data )
  console.log(product)
  dispatch(actions.addProduct())
}, actions.failed)