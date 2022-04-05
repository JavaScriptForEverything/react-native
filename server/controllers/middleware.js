const { promises } = require('nodemailer/lib/xoauth2')
const sharp = require('sharp')
const { catchAsync, getUniqueValue } = require('../util')



/* always used after multer middleware and only if try to upload image so that have access req.file/files
		router.route('/').post(
			middlewareController.upload.single('/images/products'),
			middlewareController.resizeImage, 	// only used after multer image upload not file upload
			productController.addProduct
		)
*/

exports.upload = require('../middleware/multer')




const handleImage = async (req, file, destination, quality=100) => {
	try {
		const ext = file.mimetype.split('/')[1]
		const userId = req.user?.id  || 'admin'		// used after protect middleware to get user.id
		const filename = `${file.fieldname}-${userId}-${Date.now()}.${ext}`
		const path = `${destination}/${filename}`

		await sharp(file.buffer)
			.resize(200, 300) 			// width, height
			// .toFormat('jpeg').jpeg({ quality })
			.toFile(path)

		return { public_id: getUniqueValue(), name: file.originalname, path }

	} catch (err) {
		console.log(err)
	}
}


exports.resizeImage = (destination, quality) => async (req, res, next) => {
	let temObj = {}

	// // 1. to handle upload.single()
	// if(req.file) return handleImage(req, file, destination, quality)

	// // 2. to handle upload.array()
	// if( req.files.constructor === Array ) return req.files?.forEach( file => handleImage(req, file, destination, quality))

	// 3. to handle upload.fields([ {}, {} ])
	await Promise.all(Object.entries( req.files).map( async ([name, files] ) => {
		temObj[name] = (files.length === 1) 
			? await handleImage(req, files[0], destination, quality)
			: await Promise.all(files.map( file => handleImage(req, file, destination, quality)) )
	}))

	temObj
	req.body = { ...req.body, ...temObj }
	// console.log(temObj)

	next()
}

