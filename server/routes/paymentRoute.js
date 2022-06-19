const { Router } = require('express')
const paymentController = require('../controllers/paymentController.js')
const authController = require('../controllers/authController')

module.exports = router = Router()


router.use(authController.protect)
router.post('/cash-on-delivery', paymentController.cashOnDelivery)

router.route('/')
  .get(paymentController.getStripePublishableKey)
  .post(authController.protect, paymentController.addPayment)

router.get('/:userId', paymentController.getUserPayments)
