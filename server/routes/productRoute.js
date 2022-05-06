const { Router } = require('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routes/reviewRoute')
const middlewareController = require('../controllers/middleware')
const { appError } = require('../util')
const imageHandler = require('../middleware/imageHandler')

const destination = '/static/images/products'

module.exports = router = Router() 					// export + add variable to use in current page


router.route('/')
	.get(productController.getAllProducts)
	.post(
		authController.protect, 
		imageHandler(destination, 'secure_url'),  		// secure_url : property which will be checked
		productController.addProduct
	)

// 	/api/products/:productId
router.route('/:productId')
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.removeProductById)


// nested routes
router.use('/:productId/reviews', reviewRouter) 		// need { mergeParams: true } on reviewRoute