const sharp = require('sharp')
const { getUniqueValue } = require('../util')

const handleImage = async (req, file, destination, quality=100) => {
	try {
		if( file.mimetype?.split('/')[0] !== 'image' ) return 

		const ext = file.mimetype.split('/')[1]
		const userId = req.user?.id  || 'admin'		// used after protect middleware to get user.id
		const filename = `${file.fieldname}-${userId}-${getUniqueValue(6)}.${ext}`
		const secure_url = `${destination}/${filename}`

		await sharp(file.buffer)
			.resize(300, 100) 			// width, height
			.toFormat('jpeg').jpeg({ quality })
			.toFile(secure_url)

		return { public_id: getUniqueValue(), name: file.originalname, secure_url }

	} catch (err) {
		console.log(err.message)
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
	if(req.files) {
		await Promise.all(Object.entries( req.files ).map( async ([name, files] ) => {
			temObj[name] = (files.length === 1)
				? await handleImage(req, files[0], destination, quality)
				: await Promise.all(files.map( file => handleImage(req, file, destination, quality)) )
		}))

		req.body = { ...req.body, ...temObj }
		return next()
	} 


	// To handle images: as string with base64: 	data:image/jpg;base64,.....
	const dataURL = ( obj, field, updatedObj={} ) => {
		if(obj.constructor !== Object) return obj
		if( !(field in obj) ) return obj

		const base64 = 'data:image/jpg;base64,'
		const isBase64 = obj[field].startsWith(base64)

		if( isBase64 ) {
			delete obj[field] 					// delete original field

			return { ...obj, ...updatedObj }
		}

		return obj
	}

	const result = {}
	const secure_url = 'secure_url' 											// coverPhoto: { public_id, secure_url }
	Object.keys( req.body ).forEach( async (field) => {
		const fieldValue = req.body[field]
				
		result[field] = fieldValue
		result[field] = dataURL( fieldValue, secure_url, await handleImage(req, fieldValue, destination, quality) )

		if( Array.isArray(fieldValue) ) {
			const images = fieldValue.filter( image => image && Object.keys(image).length ) // remove [null, {}]
			const promisses = images.map(obj => {
				return dataURL(obj, secure_url, handleImage(req, fieldValue, destination, quality) ) 
			})

			result[field] = await Promise.all(promisses)
		}
	})
	req.body = result

	next()
}
