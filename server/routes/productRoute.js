const { Router } = require('express')
const productController = require('../controllers/productController')
const reviewRouter = require('../routes/reviewRoute')

module.exports = router = Router() 					// export + add variable to use in current page

router.route('/')
	.get(productController.getAllProducts)
	.post(productController.addProduct)

router.route('/:productId')
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.removeProductById)


// nested routes
router.use('/:productId/reviews', reviewRouter) 		// need { mergeParams: true } on reviewRoute