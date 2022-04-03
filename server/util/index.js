const jwt = require('jsonwebtoken') 		// used getToken(user.id)



// handle promised route: catchAsync(async (req, res, next) => {...} )
exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next)

// 1. Throw this Error: if(!product) return next( appError('no product found', 404) )
exports.appError = appError = (message='', statusCode=400, status='') => {
	const error = new Error(message)

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'failed' : 'error',
	error.statusCode = statusCode

	return error
}

// 2. handle that error in express global Error handler
exports.globalErrorHandler =  (err, req, res, next) => {
	const isProduction = process.env.NODE_ENV === 'production'

	// 1. handle invalid ObjectId
	if(err.kind === 'ObjectId') err = appError(`Invalid Id: ${err.value}`, '400', 'CastError')

	// 2. handle unique: true
	if(err.code === 11000) err = appError('Duplicate Product name', '400', 'MongoError')

	// 3. handle Validation Error
	const errorMessage = err.errors && Object.entries(err.errors).map( ([key, value]) => `${key} : ${value.message}`)
	if(err.errors) err = appError(errorMessage, '400', 'ValidationError')

	// 4. handle jsonWebToken Validation
	const tokenMessage = 'Token is modified by someone, please login again go get fresh token'
	if(err.name === 'JsonWebTokenError') err = appError(tokenMessage, 403, 'JsonWebTokenError')




	res.status(err.statusCode || 500).json({
		status: err.status || 'failed',
		message: err.message,
		error: isProduction ? undefined : { ...err, stack: err.stack }
	})

}



// const filteredBody = filterArrayObject(req.body, ['role'], true) 		=> filter only role property
// const filteredBody = filterArrayObject(req.body, ['pass'], false) 		=> allow 	only pass property
exports.filterArrayObject = (obj, arr, isAlter=true) => {
	if(!obj || !arr) return console.log('(allowedArrayObject) function need 2 argument, arg1: {}, and arg2: []')

	if(obj.constructor !== Object) return console.log(`1st arg must be an object`)
	if(arr.constructor !== Array) return console.log(`2nd arg must be an Array`)

	const alter = (value) => isAlter ? !value : value

	const temObj = {}
	Object.keys(obj).forEach(field => alter( arr.includes(field) )  && (temObj[field] = obj[field]) )

	return temObj
}


// const token = getToken(user.id)
exports.getToken = (id) => jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRES })
exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_TOKEN_SECRET)
