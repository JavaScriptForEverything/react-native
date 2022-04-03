const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const { catchAsync, getToken, filterArrayObject, appError } = require('../util')



// router.route('/signup').post(userController.signup)
exports.signup = catchAsync( async (req, res, next) => {
	const filteredBody = filterArrayObject(req.body, ['role'])

	const user = await User.create(filteredBody)
	user.password = undefined

	res.status(200).json({
		status: 'success',
		user
	})
})


// router.route('/login').post(authController.protect, userController.login)
exports.login = catchAsync( async (req, res, next) => {

	const user = await User.findOne({ email: req.body.email }).select('+password')
	if( !user) return next( appError('No user found', 404) )

	const isVerifiedPassword = await bcrypt.compare(req.body.password, user.password)
	if( !isVerifiedPassword ) return next( appError('did you forget your password', 404) )

	const token = getToken(user.id)

	res.status(200).json({
		status: 'success',
		token
	})
})



// router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
exports.getAllUsers = catchAsync( async (req, res, next) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		total: users.length,
		users
	})
})


// Route-1: router.route('/:id').get(userController.getUserById)
// Route-2: router.route('/me').get(authController.protect, userController.getUserById)
exports.getUserById = catchAsync( async (req, res, next) => {
	/* 	req.user.id  		= means this route must pass after protect middleware
			req.params.id  	= /api/users/:id 		: id must supply in url */

	const userId = req.user?.id || req.params.id
	const user = await User.findById(userId)

	res.status(200).json({
		status: 'success',
		user
	})
})


// Route-1: router.route('/:id').patch(userController.updateUserById)
// Route-2: router.route('/me').patch(authController.protect, userController.updateUserById)
exports.updateUserById = catchAsync( async (req, res, next) => {
	if(req.body.password) return next(appError('Please update password, by "update-my-password" route', 403))

	const filteredBody = filterArrayObject(req.body, ['role', 'password'])

	/* 	req.user.id  		= means this route must pass after protect middleware
			req.params.id  	= /api/users/:id 		: id must supply in url */

	const userId = req.user?.id || req.params.id
	const user = await User.findByIdAndUpdate(userId, filteredBody, { new: true, runValidators: true })

	res.status(201).json({
		status: 'success',
		user
	})
})




// Route-1: router.route('/update-my-password').patch(authController.protect, userController.updateMyPassword)
exports.updateMyPassword = catchAsync( async (req, res, next) => {
	const user = req.user 		// fomes from protect middleware

	// const user = await User.findById(req.body.id)

	// user.password = req.body.password
	// const newUser = await user.save({ validateBeforeSave: false })
	// const user = req.body
	const allowedFields = ['currentPassword', 'password', 'confirmPassword']
	const filteredBody = filterArrayObject(req.body, allowedFields, false ) 	// => false means get only alowed fields
	const { currentPassword, password, confirmPassword } = filteredBody

	const isVerifiedPassword = await bcrypt.compare(currentPassword, user.password)
	if( !isVerifiedPassword ) return next( appError('did you forget your password', 404) )

	if(password !== confirmPassword) return next(appError('confirmPassword not matched'))
	
	user.password = password
	user.passwordChangedAt = Date.now() 					// used later to checked reset password 
	user.save({ validateBeforeSave: false })

	const token = getToken(user.id)

	res.status(201).json({
		status: 'success',
		message: 'password updated successfully, please re-login',
		token
	})
})


