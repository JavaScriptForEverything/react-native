const fs = require('fs')
const path = require('path')
const Product = require('../models/productModel')
const { catchAsync, appError, deleteFile, apiFeatures } = require('../util')

const factoryHandler = require('./factoryHandler')

exports.getAllProducts = factoryHandler.getAll(Product, 'products')

// exports.getAllProducts = catchAsync( async (req, res, next) => {
// 	// const products = await Product.find()
// 	const products = await apiFeatures(Product.find(), req.query)
// 	.pagination()
// 	.sort()
// 	.search()
// 	.filter()
// 	.query

// 	res.status(200).json({
// 		status: 'success',
// 		total: products.length,
// 		products
// 	})
// })


exports.addProduct = catchAsync( async (req, res, next) => {

	const product = await Product.create(req.body)

	// remove images which are uploaded before addProduct middleware
	if(!product) {
		setTimeout(() => { 		// always calls after Non-Bloacking Event Queue
			fs.unlink( path.resolve(__dirname, '..', req.body.coverPhoto?.secure_url || ''), (f)=>f )
			req.body.images?.map(file => {
				fs.unlink( path.resolve(__dirname, '..', file?.secure_url || ''), (f) => f)
			})
		}, 2000) 

		return next(appError('Can not add product'))
	}
	
	res.status(201).json({
		status: 'success',
		product
	})

})


exports.getProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findById(req.params.productId)

	if(!product) return next(appError('No product Found', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})



exports.updateProductById = factoryHandler.updateById(Product, 'product')
// exports.updateProductById = catchAsync( async (req, res, next) => {
// 	const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true })
// 	if(!product) return next(appError('No product found'))

// 	res.status(201).json({
// 		status: 'success',
// 		product
// 	})
// })


exports.removeProductById = factoryHandler.removeById(Product, 'product')
// exports.removeProductById = catchAsync( async (req, res, next) => {
// 	const product = await Product.findByIdAndDelete(req.params.productId)
// 	if(!product) return next(appError('No product found'))

// 	res.status(204).send()
// })


