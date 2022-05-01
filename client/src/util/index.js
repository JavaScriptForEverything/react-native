import { isEmail } from 'validator'
import axiosOriginal from 'axios'
import { BASE_URL } from '@env'







/* Now instead of
**
** 		import axios from 'axios'
** 		axios.get(`${BASE_URL}/api/products`, { headers: { Authorization: `Bearer ${token` }})
**
** use like bellow:
**
** 		import { axios } from '../util'
** 		axios.get('/api/products') 											: => So simple
*/
export const axios = (token) => {
	return axiosOriginal.create({
		baseURL: BASE_URL,
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
}


// => const getProducts = () => async (dispatch) => { }
// => const getProducts = () => catchAsyncDispatch( async (dispatch) => { }, actions.failed)
export const catchAsyncDispatch = (fn, errorCallback) => (dispatch, getState) => {
  return fn(dispatch, getState).catch(err => {
    const message = err.response?.data.message || err.message
    dispatch( errorCallback(message) )
  })
}

// const filteredBody = filterArrayObject(req.body, ['role'], true) 		=> filter only role property
// const filteredBody = filterArrayObject(req.body, ['pass'], false) 		=> allow 	only pass property
export const filterArrayObject = (obj, arr, isAlter=true) => {
	if(!obj || !arr) return console.log('(allowedArrayObject) function need 2 argument, arg1: {}, and arg2: []')

	if(obj.constructor !== Object) return console.log(`1st arg must be an object`)
	if(arr.constructor !== Array) return console.log(`2nd arg must be an Array`)

	const alter = (value) => isAlter ? !value : value

	const temObj = {}
	Object.keys(obj).forEach(field => alter( arr.includes(field) )  && (temObj[field] = obj[field]) )

	return temObj
}



/*
const inputItems = [
  { name: 'name',  icon: 'account' },
  { name: 'email', icon: 'lock'},
  { name: 'price', icon: 'lock'},
]
// arrayObjectAsObject(inputItems, 'name')  	// => { name: '', email: '', price: '' }
*/
export const arrayObjectAsObject = (arrayObject=[], field='name') => {
	const temObj = {}
	arrayObject.forEach(item => (field in item) && (temObj[item[field]] = '') )

	return temObj
}



/*
const fields = {
	name: '', 									// => 'name' field is empty
	email: 'abc', 							// => Invalid email address
	price: '', 									// => 'price' field is empty
	password: 'asdf', 					// =>
	confirmPassword: 'asdff' 		// => password is not matched
}
// formValidator(fields, setFieldsError)
*/
export const formValidator = (obj={}, callback=f=>f) => {
	const temObj = {}

	if( obj.confirmPassword && obj.confirmPassword !== obj.password) {
		temObj.confirmPassword = 'password is not matched'
	}

	if( obj.email && !isEmail(obj.email) ) temObj.email = 'Invalid email address'

	Object.keys(obj).forEach(field => ( !obj[field] ) && (temObj[field] = `'${field}' field is empty`) )
	callback(temObj)

	return Object.keys(temObj).every(field => !temObj[field])
}

