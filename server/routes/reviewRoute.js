const { Router } = require('express')
const reviewController = require('../controllers/reviewController')

module.exports = router = Router()

router.route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.addReview)