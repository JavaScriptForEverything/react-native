const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Payment = require('../models/paymentModel')
const { catchAsync, appError, sendMail } = require('../util')

  // .get('/api/payments', paymentController.getStripePublishableKey)
exports.getStripePublishableKey = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
}


// .post('/api/payments', authController.protect, paymentController.addPayment)
exports.addPayment = catchAsync( async (req, res, next) => {
  const { amount, currency } = req.body

  const { client_secret, id } = await stripe.paymentIntents.create({
    // payment_method_types: ['card'],    // default
    amount: amount * 100,
    currency: 'usd'
  })
  if( !id ) return next(appError('PaymentIntents create is failed', 400, 'PaymentError'))

  const data = {
    userId: req.user.id,
    currency: currency || 'usd',
    amount,
    clientSecret: client_secret,
    paymentIntentId: id
  }
  const payment = await Payment.create(data)    // same payment create into database

  res.status(201).json({
    status: 'success',
    clientSecret: client_secret
  })
})



// .post('/api/payments/cash-on-delivery', authController.protect, paymentController.cashOnDelivery)
exports.cashOnDelivery = catchAsync( async(req, res, next) => {
  const { amount, currency='usd' } = req.body
  const userEmail = req.body.email || req.user.email

	const data = { userId: req.user.id, currency, amount }
  const payment = await Payment.create(data)    // same payment create into database

  try {
	  await sendMail({
	  	from: userEmail,
	  	to: 'JavascriptForEverything@gmail.com',
	  	subject: 'Cash On Delivery',
	  	text: `Requested for product with given user details: ${JSON.stringify({
	  		...req.body,
	  		...data
	  	})}`
	  })
  } catch(err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		})

  }

	res.status(200).json({
		status: 'success',
		payment,
		message: `Your Order received, message is sent to ${userEmail}`
	})
})


exports.getUserPayments = catchAsync( async (req, res, next) => {
	const { userId } = req.params

	const payments = await Payment.find({ userId })
	// if(!payments.length) return next(appError('No payment found', 404))

	console.log({ userId })

	res.status(200).json({
		status: 'success',
		length: payments.length,
		payments
	})
})
