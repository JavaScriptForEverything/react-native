const Review = require('../models/reviewModel')
const { catchAsync, appError, filterArrayObject } = require('../util')

exports.getAllReviews = catchAsync( async (req, res, next) => {
  const reviews = await Review.find()

  res.status(200).json({
    status: 'success',
    total: reviews.length,
    reviews
  })
})

exports.addReview = catchAsync( async (req, res, next) => {
  const allowedFields = ['review', 'rating', 'user', 'product']
  const filteredBody = filterArrayObject(req.body, allowedFields, false)

  const review = await Review.create(filteredBody)
  if(!review) return next(appError('Can not create review'))

  res.status(201).json({
    status: 'success',
    review
  })
})

