const User = require('../models/userModel')
const { catchAsync, verifyToken, appError } = require('../util')




// is has token only allow to next middleware: means no token no access those route on which it applied to
exports.protect = catchAsync( async (req, res, next) => {


	const token = req.headers.authorization?.split(' ')?.[1] 		// `Bearer ${token}` => ['Bearer ', 'token...']
	if(!token) return next( appError('Please login first (to get token)', 401))

	const { id, iat } = verifyToken(token)
	const user = await User.findById(id).select('+password')

	if(!user) return next( appError('Please login', 404))

	let updateTime = user.passwordChangedAt 	// timpstamp When user change password
	    updateTime = new Date(updateTime) 		// => String => Date
	    updateTime = updateTime.getTime() 		// => time in Number <= Date

	let tokenTime = iat * 1000 								// => in second so convert to miliSeconds, because updateTime in miliSeconds

	// old token time alway less, than later update password time. because time increase in every moment
	const isPasswordChangedAfterLogin = tokenTime < updateTime
	if(isPasswordChangedAfterLogin) return next(appError('Please relogin, password changed', 403))

	req.user = user 									// used to pass user to next middleware to .restrictTo('admin')
	req.user.userId = req.user.id 		// so that we can use user.userId every where. else mergeParams create confusion

	next()
})


// must get after protect middleware, so that can access user by req.user
exports.restrictTo = (...roles) => (req, res, next) => {
	const message = 'Sorry you are not parmited to perform this operation'
	if( !roles.includes(req.user.role) ) return next(appError(message, 403, 'AdminError'))

	next()
}



