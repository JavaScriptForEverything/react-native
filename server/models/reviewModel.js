const { Schema, models, model } = require('mongoose')

const reviewSchema = new Schema({
  review: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    // minlength: 10,
    maxlength: 400
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 2
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true,
})

reviewSchema.pre(/find*/, function() {
  this.populate('user', 'name email')
  // console.log('hello')
})

module.exports = models.Review || model('Review', reviewSchema)