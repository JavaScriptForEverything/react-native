const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const sharp = require('sharp')

const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const { catchAsync, getToken, filterArrayObject, appError, sendMail, verifyToken, apiFeatures } = require('../util')

const factoryHandler = require('./factoryHandler')

exports.getAllUsers = factoryHandler.getAll(User, 'users')


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



// // router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
// exports.getAllUsers = catchAsync( async (req, res, next) => {
// 	const users = await apiFeatures(User.find(), req.query)
// 		.pagination()
// 		.sort()
// 		.search()
// 		.filter()
// 		.query

// 	res.status(200).json({
// 		status: 'success',
// 		total: users.length,
// 		users
// 	})
// })


// Route-1: router.route('/:userId').get(userController.getUserById)
// Route-2: router.route('/me').get(authController.protect, userController.getUserById)
exports.getUserById = catchAsync( async (req, res, next) => {
	/* 	req.user.userId  		= means this route must pass after protect middleware
			req.params.userId  	= /api/users/:userId 		: id must supply in url */

	const userId = req.user?.userId || req.params.userId
	const user = await User.findById(userId)
	if(!user) return next(appError('No user found', 404))

	res.status(200).json({
		status: 'success',
		user
	})
})


// exports.updateUserById = factoryHandler.updateById(User, 'user')
// Route-1: router.route('/:userId').patch(userController.updateUserById)
// Route-2: router.route('/me').patch(authController.protect, userController.updateUserById)
// exports.updateUserById = catchAsync( async (req, res, next) => {
// 	if(req.body.password) return next(appError('Please update password, by "update-my-password" route', 403))

// 	const filteredBody = filterArrayObject(req.body, ['role', 'password'])

// 	/* 	req.user.userId  		= means this route must pass after protect middleware
// 			req.params.userId  	= /api/users/:userId 		: userId must supply in url */

// 	const userId = req.user?.userId || req.params.userId
// 	const user = await User.findByIdAndUpdate(userId, filteredBody, { new: true, runValidators: true })

// 	res.status(201).json({
// 		status: 'success',
// 		user
// 	})
// })


exports.updateUserById = async (req, res, next) => {
	try {
		const filteredBody = filterArrayObject(req.body, ['role'])
		const { avatar } = req.body

		if(avatar && avatar.secure_url) {

			// 1. convert base64 dataURL to Buffer
			const base64Image = avatar.secure_url.split(';base64,').pop()
			const buff = Buffer.from(base64Image, 'base64')

			const filename = avatar.name
			const destination = path.join(__dirname, '../static/images/users', filename)

			// 2. Save buffer as image file in local Hard Disk
			// await promisify(fs.writeFile)(destination, buff) 	// Method-1: just save
			await sharp(buff) 																		// Method-2: resize and save
				.resize(200, 200)
				.toFormat('jpeg')
				.toFile(destination)

			// console.log(req.user)

			const body = {
				...filteredBody,
				avatar: {
					public_id : nanoid(),
					name: filename,
					secure_url: `static/images/users/${filename}`
				}
			}

			// 3. find old file and delete that
			const oldUser = await User.findById(req.user._id)
			const oldFile = path.resolve(oldUser.avatar.secure_url) 									// Method-2:
			// const oldFile = path.join(__dirname, '..', oldUser.avatar.secure_url) 	// Method-1:
			const isExists = await promisify(fs.exists)(oldFile)
			if(isExists) await promisify(fs.unlink)(oldFile)

			// 4. add new file's path to database
			const user = await User.findByIdAndUpdate(req.user._id, body, { new: true, runValidators: true })
			if(!user) return next(appError('No user Updated'))

			res.status(201).json({
				status: 'success',
				user
			})

		} else {
			const user = await User.findByIdAndUpdate(req.user._id, filteredBody, { new: true, runValidators: true })
			if(!user) return next(appError('No user Updated'))

			res.status(201).json({
				status: 'success',
				user
			})

		}

	} catch (err) {
		const filename = req.body.avatar.name
		const destination = path.join(__dirname, '../static/images/users', filename)

		fs.existsSync(destination) && fs.unlink(destination, err => console.log(err.message) )

		console.log(err)
		// next(appError(err.message))
	}

}


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

	// instead check password updated or not in protect middleware
	// const token = getToken(user.userId) 	// remove update token script from postman > test

	res.status(201).json({
		status: 'success',
		message: 'password updated successfully, please re-login',
		// token
	})
})



exports.removeUserById = factoryHandler.removeById(User, 'user')

// // Route-1: router.route('/:userId').delete(userController.removeUserById)
// // Route-2 :router.route('/me') .delete(authController.protect, userController.removeUserById)
// exports.removeUserById = catchAsync( async (req, res, next) => {
// 	const userId = req.user?.userId || req.params.userId

//   const user = await User.findByIdAndDelete(userId)
//   if(!user) return next(appError('Can not delete this user'))

//   res.status(204).send()
// })



// router.route('/forgot-password').post(userController.forgotPassword)
exports.forgotPassword = catchAsync( async (req, res, next) => {
	const email = req.body.email
  if(!email) return next(appError('Please supply { "email" : "your@mail.com" }'))

	const user = await User.findOne({ email })
  if(!user) return next(appError(`The email '${email}' is not registered yet.`, 404))

	const tokenExpiresIn =  1000*60*10 		// => 10 min
	const token = getToken(user.id, tokenExpiresIn.toString()) 		// expiresIn: 'stringValue'
	const resetRoute = `${req.protocol}://${req.get('host')}/api/users/password-reset`
	const text = `Copy this token:"${token}" and pass in body of "PATCH ${resetRoute}"`

	// send mail (require Internet to send email)
	await sendMail({ to: email, subject: 'Reset My Password (Expires in 10 min)', text })

	res.status(200).json({
		status: 'success',
		message: `An email is sent to '${email}' with token, which will used to reset the password`,

		// only for development perpose must remove in production
		text: process.env.Node_ENV === 'production' ? undefined : text
	})
})

// router.route('/reset-password').patch(userController.resetPassword)
exports.resetPassword = catchAsync( async (req, res, next) => {
	const { token, password, confirmPassword } = req.body

	if(!token) return next(appError('No token found', 401))
	const { id, iat } = verifyToken(token)

  const user = await User.findById(id)
  if(!user) return next(appError('No user found'))

  if(password !== confirmPassword ) return next(appError('confirm password not matched'))
	user.password = password 											// this password will be bcryptjs by pre('save') hook
	user.passwordChangedAt = new Date() 					// will use to check password changed after login or not
	user.save({ validateBeforeSave: false })

	res.status(201).json({
		status: 'success',
		message: 'Please login with this new credentials'
	})
})




// router.route('/user').get( authController.protect, userController.getAllUserProducts)
exports.getAllUserProducts = catchAsync(async (req, res, next) => {

	const productId = req.params.productId
	const products = await Product.find({ user: req.user._id })

	res.status(200).json({
		status: 'success',
		total: products.length,
		products
	})
})

// router.route('/user/:productId').get( authController.protect, userController.getUserProductById)
exports.getUserProductById = catchAsync(async (req, res, next) => {

	const productId = req.params.productId
	const product = await Product.findOne({ user: req.user._id, _id: productId })

	res.status(200).json({
		status: 'success',
		product
	})
})
