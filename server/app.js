const express = require('express')
const cors = require('cors')
const { globalErrorHandler } = require('./util')

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const reviewRouter = require('./routes/reviewRoute')



const app = express()


// middlewares
app.use(cors()) 														// => allow Cross Origin Resourcw Sharing
app.use(express.json()) 										// => allow: req.body


// routers
app.use('/api/products', productRouter)     // => /api/products
app.use('/api/users', userRouter)           // => /api/users
app.use('/api/reviews', reviewRouter)       // => /api/reviews


// global routes: used for unused routes instead of throw error or none JSON response.
app.all('*', (req, res, next) => {
  res.status(200).json({
    status: 'failed',
    message: `route '${req.originalUrl}' not used, please go back`
  })
})

// express global error handler
app.use(globalErrorHandler)

module.exports = app

