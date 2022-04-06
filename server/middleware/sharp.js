const sharp = require('sharp')
const { getUniqueValue } = require('../util')

const handleImage = async (req, file, destination, quality=100) => {
	if( file.mimetype.split('/')[0] !== 'image' ) return 

	try {
		const ext = file.mimetype.split('/')[1]
		const userId = req.user?.id  || 'admin'		// used after protect middleware to get user.id
		const filename = `${file.fieldname}-${userId}-${getUniqueValue(6)}.${ext}`
		const path = `${destination}/${filename}`

		await sharp(file.buffer)
			.resize(200, 300) 			// width, height
			.toFormat('jpeg').jpeg({ quality })
			.toFile(path)

		return { public_id: getUniqueValue(), name: file.originalname, path }

	} catch (err) {
		console.log(err)
	}
}


module.exports = (destination, quality) => async (req, res, next) => {
	let temObj = {}

	// 1. to handle upload.single()
	if(req.file) {
		temObj[req.file.fieldname] = await handleImage(req, req.file, destination, quality)

		req.body = { ...req.body, ...temObj }
		return next()
	}

	// 2. to handle upload.array()
	if( req.files?.constructor === Array ) {
		temObj[req.files[0].fieldname] = await Promise.all( 
			req.files.map( file => handleImage(req, file, destination, quality)) 
		)

		req.body = { ...req.body, ...temObj }
		return next()
	}

	// 3. to handle upload.fields([ {}, {} ])
	await Promise.all(Object.entries( req.files ).map( async ([name, files] ) => {
		temObj[name] = (files.length === 1)
			? await handleImage(req, files[0], destination, quality)
			: await Promise.all(files.map( file => handleImage(req, file, destination, quality)) )
	}))

	req.body = { ...req.body, ...temObj }

	next()
}
