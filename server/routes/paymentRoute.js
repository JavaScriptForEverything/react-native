const { Router } = require('express')
const paymentController = require('../controllers/paymentController.js')
const authController = require('../controllers/authController')

module.exports = router = Router()

router.route('/')
  .get(paymentController.getStripePublishableKey)
  .post(authController.protect, paymentController.addPayment)