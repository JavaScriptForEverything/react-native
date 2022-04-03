const Review = require('../models/reviewModel')
const { catchAsync, appError, filterArrayObject } = require('../util')

// router.route('/').get(reviewController.getAllReviews)
// router.route('/:productId/reviews').get(reviewController.getReviewById)
exports.getAllReviews = catchAsync( async (req, res, next) => {
  
  console.log(req.params)


  const reviews = await Review.find()

  res.status(200).json({
    status: 'success',
    total: reviews.length,
    reviews
  })
})


// router.route('/').post(reviewController.addReview)
// router.route('/:productId/reviews').post(reviewController.addReview)
exports.addReview = catchAsync( async (req, res, next) => {
  const allowedFields = ['review', 'rating', 'user', 'product']
  const filteredBody = filterArrayObject(req.body, allowedFields, false)

  filteredBody.user = req.user?.userId || filteredBody.user
  filteredBody.product = req.params?.productId || filteredBody.product

  const review = filteredBody
  // const review = await Review.create(filteredBody)
  if(!review) return next(appError('Can not create review'))

  res.status(201).json({
    status: 'success',
    review
  })
})


// router.route('/:reviewId').get(reviewController.getReviewById)
// router.route('/:productId/reviews/:reviewId').get(reviewController.getReviewById)
exports.getReviewById = catchAsync( async (req, res, next) => {

  console.log(req.params)

  const review = await Review.findById(req.params.reviewId)
  if(!review) return next(appError('No Review Found', 404))

  res.status(200).json({
    status: 'success',
    review
  })
})


// router.route('/:reviewId').patch(reviewController.updateReviewById)
// router.route('/:productId/reviews/:reviewId').patch(reviewController.updateReviewById)
exports.updateReviewById = catchAsync( async (req, res, next) => {
  const allowedFields = ['review', 'rating', 'user', 'product']
  const filteredBody = filterArrayObject(req.body, allowedFields, false)

  const review = await Review.findByIdAndUpdate(req.params.reviewId, filteredBody, { new: true, runValidators: true })
  if(!review) return next(appError('Can not update review'))

  res.status(201).json({
    status: 'success',
    review
  })
})


// router.route('/:reviewId').delete(reviewController.removeReviewById)
// router.route('/:productId/reviews/:reviewId').delete(reviewController.removeReviewById)
exports.removeReviewById = catchAsync( async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.reviewId)
  if(!review) return next(appError('Can not delete this review'))

  res.status(204).send()
})


