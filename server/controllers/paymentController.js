const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Payment = require('../models/paymentModel')
const { catchAsync, appError } = require('../util')

// const client_secret = 'pi_3L5mX3JhjiJCVOZf0hSPFUzf_secret_vJrq6DQcVKhRmrnhkPNb0vDtx'


exports.getStripePublishableKey = (req, res, next) => {
  // console.log({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })

  res.status(200).json({
    status: 'success',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
}


// src/store/productReducer.js : 
exports.addPayment = async (req, res, next) => {
  const { amount, currency } = req.body

  // console.log(req.user)
  // return res.status(201).json({ status: 'success', clientSecret: 'secret' })

  // if(!amount) return next(appError('No amount given', 403, 'PaymentError'))
  
  // const paymentId = 'pi_3L5mX3JhjiJCVOZf0hSPFUzf'
  // const { client_secret, id } = await stripe.paymentIntents.retrieve(paymentId)
  
  const { client_secret, id } = await stripe.paymentIntents.create({
    // payment_method_types: ['card'],    // default
    amount: amount * 100,
    currency: 'usd'
  })

  const data = {
    userId: req.user.id,
    currency: currency || 'usd',
    amount,
    clientSecret: client_secret,
    paymentIntentId: id
  }

  // const payment = await Payment.create(data)
  

  res.status(201).json({
    status: 'success',
    clientSecret: client_secret
  })
}