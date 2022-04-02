const express = require('express')
const cors = require('cors')

const productRouter = require('./routes/productRoute')



const app = express()


// middlewares
app.use(cors()) 														// => allow Cross Origin Resourcw Sharing
app.use(express.json()) 										// => allow: req.body


// routers
app.use('/api/products', productRouter)



module.exports = app

