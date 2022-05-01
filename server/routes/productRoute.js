const { Router } = require('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')
const middlewareController = require('../controllers/middleware')
const reviewRouter = require('../routes/reviewRoute')
const { appError } = require('../util')

const RESOURCE_STATIC_PATH = process.env.RESOURCE_STATIC_PATH   // => static
const DESTINATION = `${RESOURCE_STATIC_PATH}/images/products`

module.exports = router = Router() 					// export + add variable to use in current page


router.route('/')
	.get(productController.getAllProducts)
	// .post(productController.addProduct) 	// send file as reader.readAsDataURL() need header as multipart/form-data
	// .post(upload.single('coverPhoto'), productController.addProduct) 	// default multer style
	.post(
		authController.protect,
		// middlewareController.upload('/images/products', appError).single('coverPhoto'),  			// single photo
		// middlewareController.upload('/images/products', appError).array('images', 3),  				// array of photos
		/* upload.fields => upload.single() + upload.array() both in the same time, as many as we need
		** 	. 3rd arg => true: image upload which is default, 	false:file upload
		*/ 
		middlewareController.upload('/images/products', appError, true ).fields([ 	
			{ name: 'coverPhoto', maxCount: 1 },
			{ name: 'images', maxCount: 3 },
		]), 
		// only used after multer image upload not file upload
		middlewareController.resizeImage(DESTINATION, 80), 	 		// arg1: where image places, arg2: quality
		productController.addProduct
	)

// 	/api/products/:productId
router.route('/:productId')
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.removeProductById)


// nested routes
router.use('/:productId/reviews', reviewRouter) 		// need { mergeParams: true } on reviewRoute