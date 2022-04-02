exports.getAllProducts = (req, res, next) => {

	res.status(200).json({
		status: 'success',
		products: []
	})
}


exports.addProduct = (req, res, next) => {
	console.log(req.body)

	res.status(201).json({
		status: 'success',
		product: {
			name: 'added this product'
		}
	})
}

exports.getProductById = (req, res, next) => {

	console.log(req.params.id)

	res.status(200).json({
		status: 'success',
		product: {
			name: 'product 1'
		}
	})
}



exports.updateProductById = (req, res, next) => {
	console.log(req.params.id)

	res.status(201).json({
		status: 'success',
		product: {
			name: 'Updated this product'
		}
	})
}


exports.removeProductById = (req, res, next) => {
	console.log(req.params.id)

	res.status(204).send()
}


