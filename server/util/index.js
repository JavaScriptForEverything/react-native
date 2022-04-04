const jwt = require('jsonwebtoken') 				// => getToken(user.id)
const nodemailer = require('nodemailer') 		// => sendMail({...})



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





//----------[ API Features ]----------
exports.apiFeatures = (Query, queryObj) => {

	// remove this array from req.query if used, because those are reserved for our apiFeatures
	const filteredFields = ['page', 'limit', 'sort', 'fields', 'search', 'brand', 'common']
	const filteredQuery = filterArrayObject(queryObj, filteredFields)

	const query = Query.find(filteredQuery) 			// <= Model.find().find( filteredQuery )

	// 2. pagination
	const pagination = function() { 							// => ?page=2
		const page = +queryObj.page || 1
		const limit = +queryObj.limit || 4
		const skip = (page - 1) * limit

		this.query = this.query.skip(skip).limit(limit)
		return this
	}

	// 3. sorting 																// => ?sort=price,name
	const sort = function() {
		this.query = this.query.sort(queryObj.sort?.split(',').join(' '))
		return this
	}

	// 4. filter by fields
	const filter = function() { 									// => ?fields=name,price,rating
		this.query = this.query.select(queryObj.fields?.split(',').join(' '))
		return this
	}

	// 5. search
	const search = function() { 									// => ?search=name,value || ?search=product name
		const fieldName 	= queryObj.search?.split(',')[0] || 'name' 
		const searchValue = queryObj.search?.split(',')[1] || ''

		const searchObj = queryObj.search ? { [fieldName]: { $regex: searchValue, $options: 'i' }} : {}
		this.query = this.query.find(searchObj)

		return this
	}

	return {
		pagination,
		sort,
		search,
		filter,
		query
	}

}


/*
In MongoDB, the following <options> are available for use with regular expression:

    i: To match both lower case and upper case pattern in the string.
    m: To include ^ and $ in the pattern in the match i.e. to specifically search for ^ and $ inside the string. Without this option, these anchors match at the beginning or end of the string.
    x: To ignore all white space characters in the $regex pattern.
    s: To allow the dot character “.” to match all characters including newline characters.

*/