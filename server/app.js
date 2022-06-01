const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')   // NoSQL inject malicious code
const xss = require('xss-clean')  	                      // Remove <tags> entities, .js use as string not script
const rateLimit = require('express-rate-limit')           // limit number of reqest per user per hour
const helmet = require('helmet') 	                        // Add some secrirty option in response heading
const hpp = require('hpp')    // (HTTP Paramiter Polution) 	: Remove Duplicate field name, in query
const morgan = require('morgan')                          // For texting is Request coming or not

const { globalErrorHandler } = require('./util')

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const reviewRouter = require('./routes/reviewRoute')
const paymentRouter = require('./routes/paymentRoute')



const app = express()

const RESOURCE_STATIC_PATH = process.env.RESOURCE_STATIC_PATH   // => static
const STATIC_PATH = express.static(path.join(__dirname, RESOURCE_STATIC_PATH))


// Security section
app.use( helmet() ) 							          // put it in the very begining, so that every request pass through it.
app.use(mongoSanitize())                    // => { "$gt" : "" } 	=> { "gt" : ""}
app.use(xss())  										        // <div>... 				=> &gt;div$lt;
app.use(hpp())  									          // ?sort='name'&sor='age' 	=> ?sort='age'  								|
app.use( '/api', rateLimit({ 
  max 			: 100, 
  windowMs 	: 1000 * 60 * 60,
  message 	: 'reached max limit' 
}))


/* multer : Before Add Multer Set Static Directory To Access The Resources
**  . dest: '/static/images/products/
**  . http://localhost:5000/static/images/products/coverPhoto.jpg
**  
**    NB: Only full path accessable 
*/ 
app.use(`/${RESOURCE_STATIC_PATH}`, STATIC_PATH)  // => set Static dir to used by client-side
app.use(cors()) 														// => allow Cross Origin Resourcw Sharing
app.use(express.json({ limit: '20MB' })) 		// => limit not working


app.use(morgan('dev'))                      // => To indicate is requested or not with statusCode ...


// routers
app.use('/api/products', productRouter)     // => /api/products
app.use('/api/users', userRouter)           // => /api/users
app.use('/api/reviews', reviewRouter)       // => /api/reviews
app.use('/api/payments', paymentRouter)     // => /api/payments


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

