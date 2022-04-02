const express = require('express')
const cors = require('cors')

const { globalErrorHandler } = require('./util')
const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')



const app = express()


// middlewares
app.use(cors()) 														// => allow Cross Origin Resourcw Sharing
app.use(express.json()) 										// => allow: req.body


// routers
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)


// express global error handler
app.use(globalErrorHandler)

module.exports = app

