const { Schema, models, model } = require('mongoose')
const { calculateAvarageFromArrayObject } = require('../util')


const productSchema = new Schema({
	user: { 								// To connect user by to UserSchema, to virtually Propulate all user products
		type: Schema.Types.ObjectId,
		required: true, 								// auto added by protect() middleware
	},
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		// minlength: 10,
	},
	price: {
		type: Number,
		required: true,
		min: 5,
		// get: price => price.toFixed(2) 								// 200 => 200.00
	},
	rating: {
		type: Number,
		min: 0,
		default: 5
	},
	summary: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		// minlength: 20,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		// minlength: 50,
	},

	categories: [{
		type: String,
		enum: ['shirt', 'pant', 't-shart'],
		default: 'shirt'
	}],


	coverPhoto: {
		public_id: { 									// unique Id
			type: String,
			required: true,
			unique: true
		},
		secure_url: { 								// url
			type: String,
			required: true,
		}
	},
	images: [{
		public_id: {
			type: String,
			required: true,
			unique: true
		},
		secure_url: {
			type: String,
			required: true,
		}
	}]



}, {
	timestamps: true,

	// Step-1: Enable virtual fields
	toJSON: { virtuals: true }, 	
})

// Step-2: Create Virtual Field & link Product._id <===> Review._id
productSchema.virtual('reviews', { 	
	ref: 'Review', 											// => Review Schema Name
	foreignField: 'product', 						// => ReviewSchema.product field name
	localField: '_id' 									// => Current Schema's id <===> foreignField
})

// Step-3: Populate Reviews from Review._id
productSchema.pre(/find*/, function() {
	this.populate('reviews', '-__v -createdAt -updatedAt')
})

// // calculat avarage rating from virtual property 'reviews' and saved into another virtual property
// productSchema.virtual('totalReview').get(function () {
// 	return calculateAvarageFromArrayObject(this.reviews, 'rating') || 0
// })

/* 	const value = 100
		const discount = 0.1 		// <= 10% <= 10/100
		const discountValue = value - (value * discount)
		const valueWithDiscount = value + (value * discount) */
productSchema.virtual('oldPrice').get(function () {
	return this.price + (this.price * .1)
})



module.exports =  models.Product || model('Product', productSchema)










/*

{
	"name" : "product 1",
	"price" : 42,
	"rating" : 4.5,
	"summary" : "little summary goes here",
	"description" : "long description little summary goes here",
	"coverPhoto" : "/images/coverPhoto.jpg",
	"images" : [ "/images/image1.jpg" ],

	"categories": [ "shirt", "pant", ...seeModel ]
}

*/
