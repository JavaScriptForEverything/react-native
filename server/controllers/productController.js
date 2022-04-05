const Product = require('../models/productModel')
const { catchAsync, appError, apiFeatures } = require('../util')


exports.getAllProducts = catchAsync( async (req, res, next) => {
	// const products = await Product.find()
	const products = await apiFeatures(Product.find(), req.query)
	.pagination()
	.sort()
	.search()
	.filter()
	.query

	res.status(200).json({
		status: 'success',
		total: products.length,
		products
	})
})


exports.addProduct = catchAsync( async (req, res, next) => {
	// const product = await Product.create(req.body)
	const product = { ...req.body }
	// const product = { ...req.body }

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



exports.updateProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true })
	if(!product) return next(appError('No product found'))

	res.status(201).json({
		status: 'success',
		product
	})
})


exports.removeProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.productId)
	if(!product) return next(appError('No product found'))

	res.status(204).send()
})


