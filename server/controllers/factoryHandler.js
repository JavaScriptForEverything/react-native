const { catchAsync, appError, filterArrayObject, apiFeatures } = require('../util')

exports.getAll = (Model, name) => catchAsync( async (req, res, next) => {
  const productId = req.params?.productId
  const filterObj = productId ? { product: productId } : {}


  // const reviews = await Review.find(filterObj)
  const docs = await apiFeatures(Model.find(filterObj), req.query)
	.pagination()
	.sort()
	.search()
	.filter()
	.query

  res.status(200).json({
    status: 'success',
    total: docs.length,
    [name]: docs
  })
})



exports.updateById = (Model, name) => catchAsync( async (req, res, next) => {
	if(req.body.password) return next(appError('Please update password, by "update-my-password" route', 403))

	const userId = req.user?.userId || req.params[`${name}Id`]
	const id = name === 'user' ? userId : req.params[`${name}Id`]

	const filteredBody = filterArrayObject(req.body, ['role', 'password'])
  if(name === 'review') {
    filteredBody.user = req.user?.userId || filteredBody.user
    filteredBody.product = req.params?.productId || filteredBody.product
  }

	const doc = await Model.findByIdAndUpdate(id, filteredBody, { new: true, runValidators: true })
	if(!doc) return next(appError(`No ${name} Found`, 404))

	res.status(201).json({
		status: 'success',
		[name]: doc
	})
})



exports.removeById = (Model, name) => catchAsync( async (req, res, next) => {
	const userId = req.user?.userId || req.params[`${name}Id`]  // userId | productId | reviewId
  const id = name === 'user' ? userId : req.params[`${name}Id`]

	const doc = await Model.findByIdAndDelete(id)
	if(!doc) return next(appError(`No ${name} found`))

	res.status(204).send()
})

