const { Router } = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

module.exports = router = Router()

router.route('/signup').post(userController.signup)
router.route('/login').post(userController.login)

router.route('/update-my-password').patch(userController.updateMyPassword)

router.route('/')
	.get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
