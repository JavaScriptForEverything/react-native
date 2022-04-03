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

	const token = getToken(user.userId)

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


// Route-1: router.route('/:userId').get(userController.getUserById)
// Route-2: router.route('/me').get(authController.protect, userController.getUserById)
exports.getUserById = catchAsync( async (req, res, next) => {
	/* 	req.user.userId  		= means this route must pass after protect middleware
			req.params.userId  	= /api/users/:userId 		: id must supply in url */

	const userId = req.user?.userId || req.params.userId
	const user = await User.findById(userId)

	res.status(200).json({
		status: 'success',
		user
	})
})


// Route-1: router.route('/:userId').patch(userController.updateUserById)
// Route-2: router.route('/me').patch(authController.protect, userController.updateUserById)
exports.updateUserById = catchAsync( async (req, res, next) => {
	if(req.body.password) return next(appError('Please update password, by "update-my-password" route', 403))

	const filteredBody = filterArrayObject(req.body, ['role', 'password'])

	/* 	req.user.userId  		= means this route must pass after protect middleware
			req.params.userId  	= /api/users/:userId 		: userId must supply in url */

	const userId = req.user?.userId || req.params.userId
	const user = await User.findByIdAndUpdate(userId, filteredBody, { new: true, runValidators: true })

	res.status(201).json({
		status: 'success',
		user
	})
})




// Route-1: router.route('/update-my-password').patch(authController.protect, userController.updateMyPassword)
exports.updateMyPassword = catchAsync( async (req, res, next) => {
	const user = req.user 		// fomes from protect middleware

	// const user = await User.findById(req.body.userId)

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

	const token = getToken(user.userId)

	res.status(201).json({
		status: 'success',
		message: 'password updated successfully, please re-login',
		token
	})
})




// Route-1: router.route('/:userId').delete(userController.removeUserById)
// Route-2 :router.route('/me') .delete(authController.protect, userController.removeUserById)
exports.removeUserById = catchAsync( async (req, res, next) => {
	const userId = req.user?.userId || req.params.userId

  const user = await User.findByIdAndDelete(userId)
  if(!user) return next(appError('Can not delete this user'))

  res.status(204).send()
})



// router.route('/forgot-password').post(userController.forgotPassword)
exports.forgotPassword = catchAsync( async (req, res, next) => {

  const user = { name: 'riajul', age: 27 }
  if(!user) return next(appError('No user found'))

	res.status(201).json({
		status: 'success',
		user: req.body
	})
})

// router.route('/reset-password').patch(userController.resetPassword)
exports.resetPassword = catchAsync( async (req, res, next) => {
  const user = { name: 'riajul', age: 27 }
  if(!user) return next(appError('No user found'))

	res.status(201).json({
		status: 'success',
		user: req.body
	})
})


