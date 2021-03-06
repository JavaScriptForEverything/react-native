const crypto = require('crypto')
const jwt = require('jsonwebtoken') 				// => getToken(user.id)
const nodemailer = require('nodemailer') 		// => sendMail({...})

// every component used from ./util/index.js 		instead of /util/apiFeatures.js
exports.apiFeatures = require('./apiFeatures') 		



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

	// 4. handle jsonWebToken ValidationError
	const tokenMessage = 'Token is modified by someone, please login again go get fresh token'
	if(err.name === 'JsonWebTokenError') err = appError(tokenMessage, 403, err.name)

	// 5. handle jsonWebToken ExpirationError
	const tokenExpireMessage = 'This token already expires, so please procceed with new token'
	if(err.name === 'TokenExpiredError') err = appError(tokenExpireMessage, 400, err.name)

	// 6. handle multer ValidationError
	const fileUploadLimitMessage = 'Limit Cross of Maximum number of files upload'
	if(err.code === 'LIMIT_UNEXPECTED_FILE') err = appError(fileUploadLimitMessage, 400, err.name)


	res.status(err.statusCode || 500).json({
		status: err.status || 'failed',
		message: err.message,
		error: isProduction ? undefined : { ...err, stack: err.stack }
	})
}

/*
 "status": "failed",
    "message": "Unexpected field",
    "error": {
        "name": "MulterError",
        "message": "Unexpected field",
        "code": "LIMIT_UNEXPECTED_FILE",
        "field": "images",
        "storageErrors": [],*/


// const filteredBody = filterArrayObject(req.body, ['role'], true) 		=> filter only role property
// const filteredBody = filterArrayObject(req.body, ['pass'], false) 		=> allow 	only pass property
// const filteredBody = filterArrayObject(req.body, Object.keys(obj), false) => filter 1st obj by 2nd obj
exports.filterArrayObject = filterArrayObject = (obj, arr, isAlter=true) => {
	if(!obj || !arr) return console.log('(allowedArrayObject) function need 2 argument, arg1: {}, and arg2: []')

	if(obj.constructor !== Object) return console.log(`1st arg must be an object`)
	if(arr.constructor !== Array) return console.log(`2nd arg must be an Array`)

	const alter = (value) => isAlter ? !value : value

	const temObj = {}
	Object.keys(obj).forEach(field => alter( arr.includes(field) )  && (temObj[field] = obj[field]) )

	return temObj
}


// const token = getToken(user.id)
exports.getToken = (id, expireTime) => {
	const mySecret = process.env.JWT_TOKEN_SECRET
	const expiresIn = expireTime || process.env.JWT_TOKEN_EXPIRES 

	/* Note: About Expires Token 
	** 	if use 3rd argument: expiresIn: '200' 	=> 200s, and value must be string,
	** 	else use 1st argument: { id, exp: 60*10 } 	=> 10m */ 
	
	return jwt.sign({ id }, mySecret, { expiresIn })
}
exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_TOKEN_SECRET)



//----------[ SendMail ]----------
const mailtrapCredential = {
	  host: process.env.MAILTRAP_HOST,
	  port: process.env.MAILTRAP_PORT,
	  auth: {
	    user: process.env.MAILTRAP_USER,
	    pass: process.env.MAILTRAP_PASS,
	  }
	}
const sendGridCrediential = {
	  service: 'SendGrid',
	  auth: {
	    user: process.env.SENDGRID_USER,
	    pass: process.env.SENDGRID_PASS,
	  }
	}
// const transportOptions = process.env.NODE_ENV === 'production' ? sendGridCrediential : mailtrapCredential
const transportOptions = mailtrapCredential 	// SendGrid account disabled after some time

exports.sendMail = async ({ from='<javascriptForEverything@gmail.com>', to, subject, text }) => {
	const transport = nodemailer.createTransport(transportOptions)

	await transport.sendMail({ from, to, subject, text })
}






exports.getUniqueValue = (length=32) => Buffer.from(crypto.randomBytes(length), Date.now()).toString('hex')



/* 	const reviews = [{ rating: 5 }, { rating: 4 }, { rating: 3 }, ]
** calculateAvarageFromArrayObject(reviews, 'rating') 			// => 4

	exports.calculateAvarageFromArrayObject = (arrObj, field) => {
		const ratings = Object.values(arrObj).map(review => review[field])
		const totalRatings = ratings.reduce((total, rating) => total + rating)
		const avarageRating = totalRatings / ratings.length

		return avarageRating
	}
*/
exports.calculateAvarageFromArrayObject = (arrObj, field) => {
	// 1. check args are not empty
	if(!arrObj || !field) return console.log('required: arg1 as arrayObject and arg2 as string')

	// 2. check arg1 must be array
	if(!Array.isArray(arrObj)) return console.log('arg1 must be an array object')

	// 3. check arg1 is not empty array
	if(arrObj.length < 1) return console.log('arg1 is empty array')

	// 4. check array item is an object
	const isObject = arrObj.every(item => typeof item === 'object')
	if( !isObject ) return console.log(`array item must be an object with property of "${field}"`)

	// 5. if any object array object, not have field property just ignore that item
	let ratings = Object.values(arrObj)?.map(review => review[field] )
	    ratings = ratings.filter(Boolean)


	const totalRatings = ratings?.reduce((total, rating) => total + rating, 0)
	const avarageRating = totalRatings / ratings.length

	return avarageRating.toFixed(2)
}
