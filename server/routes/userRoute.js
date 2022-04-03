const { Router } = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

module.exports = router = Router()

router.route('/signup').post(userController.signup)
router.route('/login').post(userController.login)

router.route('/update-my-password').patch(authController.protect, userController.updateMyPassword)

router.route('/me')
	.get(authController.protect, userController.getUserById)
	.patch(authController.protect, userController.updateUserById)


router.route('/')
	.get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)

router.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUserById)
