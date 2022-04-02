require('dotenv').config() 										// load /.env config file

const app = require('./app')


const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
	const serverMessage = `server is running on port: ${PORT}`

	require('./models/database') 								// import database here
		.then( conn => console.log(`[${conn.connection.host}]: ${serverMessage}` ) )
		.catch( err => console.log(err.message) )
})
