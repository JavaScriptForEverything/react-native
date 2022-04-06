const Review = require('../models/reviewModel')
const { catchAsync, appError, filterArrayObject, apiFeatures } = require('../util')
const factoryHandler = require('./factoryHandler')



exports.getAllReviews = factoryHandler.getAll(Review, 'reviews')

// router.route('/').get(reviewController.getAllReviews)
// router.route('/:productId/reviews').get(reviewController.getReviewById)
// exports.getAllReviews = catchAsync( async (req, res, next) => {
//   const productId = req.params?.productId
//   const filterObj = productId ? { product: productId } : {}

//   console.log(Review.collection.collectionName)

//   // const reviews = await Review.find(filterObj)
//   const reviews = await apiFeatures(Review.find(filterObj), req.query)
// 	.pagination()
// 	.sort()
// 	.search()
// 	.filter()
// 	.query


//   res.status(200).json({
//     status: 'success',
//     total: reviews.length,
//     reviews
//   })
// })

// router.route('/').post(reviewController.addReview)
// router.route('/:productId/reviews').post(reviewController.addReview)
exports.addReview = catchAsync( async (req, res, next) => {
  const allowedFields = ['review', 'rating', 'user', 'product']
  const filteredBody = filterArrayObject(req.body, allowedFields, false)

  filteredBody.user = req.user?.userId || filteredBody.user
  filteredBody.product = req.params?.productId || filteredBody.product

  const review = await Review.create(filteredBody)
  if(!review) return next(appError('Can not create review'))

  res.status(201).json({
    status: 'success',
    review
  })
})


// router.route('/:reviewId').get(reviewController.getReviewById)
// router.route('/:productId/reviews/:reviewId').get(reviewController.getReviewById)
exports.getReviewById = catchAsync( async (req, res, next) => {

  const productId = req.params?.productId
  const reviewId = req.params?.reviewId
  const filterObj = productId ? { product: productId, _id: reviewId } : { _id: reviewId }
  const review = await Review.findOne(filterObj)
  // const review = await Review.findById(req.params.reviewId)
  if(!review) return next(appError('No Review Found', 404))

  res.status(200).json({
    status: 'success',
    review
  })
})


exports.updateReviewById = factoryHandler.updateById(Review, 'review')
// // router.route('/:reviewId').patch(reviewController.updateReviewById)
// // router.route('/:productId/reviews/:reviewId').patch(reviewController.updateReviewById)
// exports.updateReviewById = catchAsync( async (req, res, next) => {
//   const allowedFields = ['review', 'rating', 'user', 'product']
//   const filteredBody = filterArrayObject(req.body, allowedFields, false)

//   filteredBody.user = req.user?.userId || filteredBody.user
//   filteredBody.product = req.params?.productId || filteredBody.product

//   const review = await Review.findByIdAndUpdate(req.params?.reviewId, filteredBody, { new: true, runValidators: true })
//   if(!review) return next(appError('Can not update review'))

//   res.status(201).json({
//     status: 'success',
//     review
//   })
// })


exports.removeReviewById = factoryHandler.removeById(Review, 'review')

// // router.route('/:reviewId').delete(reviewController.removeReviewById)
// // router.route('/:productId/reviews/:reviewId').delete(reviewController.removeReviewById)
// exports.removeReviewById = catchAsync( async (req, res, next) => {
//   const review = await Review.findByIdAndDelete(req.params.reviewId)
//   if(!review) return next(appError('Can not delete this review'))

//   res.status(204).send()
// })


