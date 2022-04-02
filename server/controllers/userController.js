const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const { catchAsync, getToken, filteredArrayObject } = require('../util')



exports.signup = catchAsync( async (req, res, next) => {
	const filteredBody = filteredArrayObject(req.body, ['role'])

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



exports.getAllUsers = catchAsync( async (req, res, next) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		total: users.length,
		users
	})
})

exports.updateMyPassword = catchAsync( async (req, res, next) => {
	const user = await User.findById(req.body.id)

	// user.password = req.body.password
	const newUser = await user.save({ validateBeforeSave: false })
	// const user = req.body

	res.status(200).json({
		status: 'success',
		// user,
		newUser

	})
})


