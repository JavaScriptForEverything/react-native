const { Schema, model, models } = require('mongoose')

const paymentSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  paymentIntentId: {
    type: String,
    // required: true,
  },
  clientSecret: {
    type: String,
    // required: true,
    // unique: true
  },
  confirm: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  currency: {
    type: String,
    default: 'usd',
  }

}, {
  timestamps: true
})

module.exports = models.Payment || model('Payment', paymentSchema)


/*
{
  "paymentIntentId": "asdkfasdf",
  "clientSecret": "asdkjfasdfj",
  "confirm" : false,
  "amount" : 200,
  "currency" : "usd"
}
*/
