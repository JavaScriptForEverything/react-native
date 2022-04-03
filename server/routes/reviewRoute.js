const { Router } = require('express')
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

module.exports = router = Router({ mergeParams: true })


router.use(authController.protect)    // bellow routes must be protected from un-login users

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.addReview)


router.route('/:reviewId')
  .get(reviewController.getReviewById)
  .patch(reviewController.updateReviewById)
  .delete(reviewController.removeReviewById)