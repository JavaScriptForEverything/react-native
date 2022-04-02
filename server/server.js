require('dotenv').config() 										// load /.env config file

const app = require('./app')


const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
	const serverMessage = `server is running on port: ${PORT}`

	require('./models/database') 								// import database here
		.then( conn => console.log(`[${conn.connection.host}]: ${serverMessage}` ) )
		.catch( err => console.log(err.message) )
})










/* Requires Environment Variables

DB_LOCAL_URL=
DB_REMOTE_URL=

JWT_TOKEN_SALT=erqererkjrqkwjedFTEadad
JWT_TOKEN_EXPIRES=30d

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MAILTRAP_HOST=
MAILTRAP_PORT=
MAILTRAP_USER=
MAILTRAP_PASS=

SENDGRID_USER=
SENDGRID_PASS=



*/

