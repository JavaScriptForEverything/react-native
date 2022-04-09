
// => const getProducts = () => async (dispatch) => { }
// => const getProducts = () => catchAsyncDispatch( async (dispatch) => { }, actions.failed)
export const catchAsyncDispatch = (fn, errorCallback) => (dispatch, getStore) => {
  return fn(dispatch, getStore).catch(err => {
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

