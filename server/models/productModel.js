const { Schema, models, model } = require('mongoose')


const productSchema = new Schema({
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


	// coverPhoto: { type: String, default: 'images/coverPhoto.jpg' },
	// images: [{ type: String, // default: 'images/image1.jpg' }],


	coverPhoto: {
		public_id: { 									// unique Id
			type: String,
			required: true,
			unique: true
		},
		name: { 											// to add image alt SEO
			type: String,
			required: true,
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
		name: {
			type: String,
			required: true,
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
	ref: 'Review',
	foreignField: 'product',
	localField: '_id'
})

// Step-3: Populate Reviews from Review._id
productSchema.pre(/find*/, function() {
	// this.populate('reviews', '-__v -createdAt -updatedAt')
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
	"images" : [ "/images/image1.jpg" ]
}

*/
