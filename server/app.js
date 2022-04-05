const express = require('express')
const cors = require('cors')
const path = require('path')
const { globalErrorHandler } = require('./util')

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const reviewRouter = require('./routes/reviewRoute')



const app = express()

const RESOURCE_STATIC_PATH = process.env.RESOURCE_STATIC_PATH   // => static
const STATIC_PATH = express.static(path.join(__dirname, RESOURCE_STATIC_PATH))

// middlewares
/* multer : Before Add Multer Set Static Directory To Access The Resources
**  . dest: '/static/images/products/
**  . http://localhost:5000/static/images/products/coverPhoto.jpg
**  
**    NB: Only full path accessable 
*/ 
app.use(`/${RESOURCE_STATIC_PATH}`, STATIC_PATH)  // => set Static dir to used by client-side
app.use(cors()) 														// => allow Cross Origin Resourcw Sharing
app.use(express.json({ limit: '10kb' })) 		// => allow: req.body & limit data upto 20kb


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

