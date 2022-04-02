const axios = require('axios')

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

(async() => {
	// const { data } = await axios.get('/posts?_limit=2')
	const { data } = await axios.get('/posts', { params: {_limit: 2 } })
	console.log(data)
})()
