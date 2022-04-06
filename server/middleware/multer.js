const multer = require('multer')

const RESOURCE_STATIC_PATH = process.env.RESOURCE_STATIC_PATH   // => static

/* Method-1: Default multer way
			const multer = require('multer')
			const upload = multer({...})
			router.route('/').post( upload.single('coverPhoto'), productController.addProduct)

** Method-2: Our custom function
			module.exports = () => ...build as bellow
			const upload = require('../util/multer')
			router.route('/').post(protect, upload('/images/products', appError).single('coverPhoto'), addProduct)


	router.route('/')
		.post(productController.addProduct) 	// send file as reader.readAsDataURL() need header as multipart/form-data
		.post(upload.single('coverPhoto'), productController.addProduct) 			// default multer style
		.post(
			authController.protect, 																						// (optional) add req.user.id 
			upload('/images/products', appError).single('coverPhoto'),  				// single photo
			// upload('/images/products', appError).array('images', 3),  				// array of photos
			// upload('/images/products', appError).fields([ 										// fields => single + array
				// { name: 'coverPhoto', maxCount: 1 },
				// { name: 'images', maxCount: 3 },
			// ]), 
			productController.addProduct
		)
*/


/* instead of directly used inside project, plase all middleware into middleware folder and 
		import into /controllers/middlewareController.js

router.route('/')
	.get(productController.getAllProducts)
	.post(
		authController.protect,
		middlewareController.upload('/images/products', appError).fields([ 	// fields => single + array
			{ name: 'coverPhoto', maxCount: 1 },
			{ name: 'images', maxCount: 3 },
		]), 
		middlewareController.resizeImage, 	// only used after multer image upload not file upload
		productController.addProduct
	)
*/

module.exports =  (path, appError, isImage=true ) =>  {
	const storage = isImage ? multer.memoryStorage() : multer.diskStorage({
		destination: (req, file, cb) => cb(null, `${RESOURCE_STATIC_PATH}/${path}`) ,
		filename: (req, file, cb) => {
			const ext = file.mimetype.split('/')[1]
			const userId = req.user?.id  || 'admin'		// used after protect middleware to get user.id
			const filename = `${file.fieldname}-${userId}-${Date.now()}.${ext}`

			cb(null, filename) 	// pass filename to next 'fileFilter' middleware. 
		}
	})

	const upload = multer({
		storage,
		fileFilter: (req, file, cb) => {

			// Only image allowed
			const imageErrorMessage = `Please select an image file, use selected: ${file.originalname}`
			if(isImage && !file.mimetype.startsWith('image')) return cb(appError(imageErrorMessage), false) 	

			cb(null, true) 				// similar as next()  cb(message, boolean) => true: success, false:failed
		}
	})

	return upload
}


