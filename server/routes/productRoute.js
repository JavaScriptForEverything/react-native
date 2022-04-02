const { Router } = require('express')
const productController = require('../controllers/productController')

module.exports = router = Router() 					// export + add variable to use in current page

router.route('/')
	.get(productController.getAllProducts)
	.post(productController.addProduct)

router.route('/:id')
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.removeProductById)

