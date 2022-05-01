const { Schema, models, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minlength: 4,
		maxlength: 20
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate: isEmail 												// validate: (email) => isEmail(email)
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 20,
		select: false
	},
	confirmPassword: {
		type: String,
		required: true,
		validate: function( confirmPassword ) { return this.password === confirmPassword }
	},
	role: {
		type: String,
		enum: ['admin', 'user', 'guest'],
		default: 'user'
	},
	passwordChangedAt: Date, 						// used to check passed changed or not
		

	avatar: {
		public_id: { 									// unique Id
			type: String,
			default: Math.floor(Math.random() * 1000000000000).toString(32)
		},
		name: { 											// to add image alt SEO
			type: String,
			default: 'default-user-photo'
		},
		secure_url: { 								// url
			type: String,
			default: 'static/images/users/default.jpg'
		}
	},
	phone: String

}, {
	timestamps: true,
	toJSON: { virtuals: true } 			// Step-1: Enable Virtual fields
})

userSchema.pre('save', async function() {
	if( !this.isModified('password') ) return

	this.password = await bcrypt.hash(this.password, 12)
	this.confirmPassword = undefined
})

// // Step-2: Connect to ForeignField 
// userSchema.virtual('products', {
// 	ref: 'Product', 								// Product Model
// 	foreignField: 'user', 					// Product.user 	which is userId
// 	localField: '_id' 							// current._id === Product.user
// })

// // Step-3: Get products data and same into given (virtual) field
// userSchema.pre(/find*/, async function(next) {
// 	this.populate('products')
// 	next()
// })

module.exports = models.User || model('User', userSchema)


/*
{
	"name" : "riajul islam",
	"email" : "abc@gmail.com",
	"password" : "asdfasdf",
	"confirmPassword" : "asdfasdf",
	"role" : "admin"
}
*/
