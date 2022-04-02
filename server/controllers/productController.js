const Product = require('../models/productModel')
const { catchAsync, appError } = require('../util')


exports.getAllProducts = catchAsync( async (req, res, next) => {
	const products = await Product.find()

	res.status(200).json({
		status: 'success',
		total: products.length,
		products
	})
})


exports.addProduct = catchAsync( async (req, res, next) => {
	const product = await Product.create(req.body)

	res.status(201).json({
		status: 'success',
		product
	})
})


exports.getProductById = catchAsync( async (req, res, next) => {

	const product = await Product.findById(req.params.id)

	if(!product) return next(appError('No product Found', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})



exports.updateProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

	res.status(201).json({
		status: 'success',
		product
	})
})


exports.removeProductById = catchAsync( async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id)

	res.status(204).send()
})


