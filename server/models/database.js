const { connect } = require('mongoose')

const { DB_LOCAL_URL, DB_REMOTE_URL } = process.env 		// comes from .env  file

const DATABASE = process.env.NODE_ENV === 'production' ? DB_REMOTE_URL : DB_LOCAL_URL

module.exports = (() => connect(DATABASE) )()
