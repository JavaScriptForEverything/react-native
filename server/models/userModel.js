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
	}


}, {
	timestamps: true
})

userSchema.pre('save', async function() {
	console.log( !this.isModified('password') )
	if( !this.isModified('password') ) return

	this.password = await bcrypt.hash(this.password, 12)
	this.confirmPassword = undefined
})


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
