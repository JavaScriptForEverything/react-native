/* always used after multer middleware and only if try to upload image so that have access req.file/files
		router.route('/').post(
			middlewareController.upload.single('/images/products'),
			middlewareController.resizeImage, 	// only used after multer image upload not file upload
			productController.addProduct
		)
*/

exports.upload = require('../middleware/multer')
exports.resizeImage = require('../middleware/sharp')


