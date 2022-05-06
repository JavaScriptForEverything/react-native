const fs = require('fs/promises')
const path = require('path')
const Product = require('../models/productModel')
const { catchAsync, appError, apiFeatures } = require('../util')

const factoryHandler = require('./factoryHandler')

const deleteFile = async (obj={}, imageField='secure_url') => {
	
	if( obj?.constructor !== Object || !(imageField in obj) ) return
		
	const url = path.join(__dirname, '../static', obj[imageField])

	try {
		await fs.unlink(url)
	} catch (err) {
		console.log(err.message)
	}
}


// // remove this method later, instead use above deleteFile()
// const deleteFiles = async (body) => {
// 	try {
// 		await promisify(fs.unlink)( path.resolve(__dirname, '..', body.coverPhoto?.secure_url || '')) 

// 		if( !Array.isArray(body.images) ) {
// 			await promisify(fs.unlink)( path.resolve(__dirname, '..', body.images?.secure_url || '') )
// 		} else {
// 			body.images?.map( async file => {
// 				await promisify(fs.unlink)( path.resolve(__dirname, '..', file?.secure_url || ''))
// 			})
// 		}

// 	} catch (err) {
// 		return err
// 	}
// }





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


exports.addProduct = async (req, res, next) => {
	/* Because we modify body asynchronously, so 	
	** 	req.body 				=> before modify req.body 	==> 	Body with Requested data
	** 	await req.body 	=> after modify req.body 		==> 	Body modifyed by imageHandler middleware
	*/ 
	// const body = await req.body 	

	// return res.status(201).json({
	// 	status: 'success',
	// 	body: body
	// })

	try {
		const body = await req.body 	
		// throw Error('Test Delete File')

		req.body.user = req.user.id 			// user comes from protect middleware
		const product = await Product.create(body)
		// console.log(body)

		if(!product) return next(appError('No product found'))

		res.status(201).json({
			status: 'success',
			product
		})

	} catch (err) {
		const body = req.body

		Object.keys(body).forEach(field => {
			if( Array.isArray(body[field]) ) body[field].forEach(item => deleteFile(item))
			deleteFile(body[field])
		})
		next(appError(err.message))
	}
}


exports.getProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findById(req.params.productId)

	if(!product) return next(appError('No product Found', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})



/* Disable this route, instead create new product by deleting old one. 
	- this way upload & delete file not to be handle here.
*/ 
exports.updateProductById = factoryHandler.updateById(Product, 'product')
// exports.updateProductById = catchAsync( async (req, res, next) => {
// 	const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true })
// 	if(!product) return next(appError('No product found'))

// 	res.status(201).json({
// 		status: 'success',
// 		product
// 	})
// })


// // exports.removeProductById = factoryHandler.removeById(Product, 'product')
// exports.removeProductById = catchAsync( async (req, res, next) => {
// 	const product = await Product.findByIdAndDelete(req.params.productId)
// 	if(!product) return next(appError('No product found'))

// 	console.log(product)

// 	res.status(204).send()
// })



// exports.addProduct = catchAsync( async (req, res, next) => {
// 	const product = await Product.create(req.body)

// 	// remove images which are uploaded before addProduct middleware
// 	if(!product) {
// 		setTimeout(() => { 		// always calls after Non-Bloacking Event Queue
// 			fs.unlink( path.resolve(__dirname, '..', req.body.coverPhoto?.secure_url || ''), (f)=>f )
// 			req.body.images?.map(file => {
// 				fs.unlink( path.resolve(__dirname, '..', file?.secure_url || ''), (f) => f)
// 			})
// 		}, 2000) 

// 		return next(appError('Can not add product'))
// 	}
// 	res.status(201).json({
// 		status: 'success',
// 		product
// 	})
// })


exports.removeProductById = async (req, res, next) => {

	const product = await Product.findById(req.params.productId)
	// const product = await Product.findByIdAndDelete(req.params.productId)
	if(!product) return next(appError('No product found'))

/* => Return weide Object's Properties, because of Object.constructor === Object in deleteFile()
	const fields = Object.keys(product) 				
	const fields = Object.keys(product._doc)
*/ 

	const body = product._doc 
	Object.keys(body).forEach(field => {
		if( Array.isArray(body[field]) ) body[field].forEach(item => deleteFile(item))
		deleteFile(body[field])
	})

	return res.status(200).json({
		status: 'success',
		product 
	})
	// await deleteFiles(product)
	res.status(204).send()
}

