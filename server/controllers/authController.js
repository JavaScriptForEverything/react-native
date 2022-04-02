const User = require('../models/userModel')
const { catchAsync, verifyToken, appError } = require('../util')




exports.protect = catchAsync( async (req, res, next) => {

	const token = req.headers.authorization?.split(' ')?.[1] 		// `Bearer ${token}` => ['Bearer ', 'token...']
	if(!token) return next( appError('Please login first (to get token)', 401))

	const { id, iat } = verifyToken(token)

	const user = await User.findById(id)
	if(!user) return next( appError('can not fetched data from database'))

	req.user = user 									// used to pass user to next middleware to .restrictTo('admin')

	next()
})


// must get after protect middleware, so that can access user by req.user
exports.restrictTo = (...roles) => (req, res, next) => {
	const message = 'Sorry you are not parmited to perform this operation'
	if( !roles.includes(req.user.role) ) return next(appError(message, 403, 'AdminError'))

	next()
}


