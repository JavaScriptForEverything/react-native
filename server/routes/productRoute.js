const { Router } = require('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routes/reviewRoute')
const middlewareController = require('../controllers/middleware')
const { appError } = require('../util')
const imageHandler = require('../middleware/imageHandler')

const RESOURCE_STATIC_PATH = process.env.RESOURCE_STATIC_PATH   // => static
// const DESTINATION = `${RESOURCE_STATIC_PATH}/images/products`
const DESTINATION = `${RESOURCE_STATIC_PATH}/images/reviews`

module.exports = router = Router() 					// export + add variable to use in current page


router.route('/')
	.get(productController.getAllProducts)
	.post(
		authController.protect, 
		imageHandler(DESTINATION, 'secure_url'),  		// secure_url : property which will be checked
		productController.addProduct
	)

// 	/api/products/:productId
router.route('/:productId')
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.removeProductById)


// nested routes
router.use('/:productId/reviews', reviewRouter) 		// need { mergeParams: true } on reviewRoute