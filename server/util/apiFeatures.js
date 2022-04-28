
//----------[ API Features ]----------
module.exports = (Query, queryObj) => {

	// remove this array from req.query if used, because those are reserved for our apiFeatures
	const filteredFields = ['page', 'limit', 'sort', 'fields', 'search', 'brand', 'common']
	const filteredQuery = filterArrayObject(queryObj, filteredFields)

	const query = Query.find(filteredQuery) 			// <= Model.find().find( filteredQuery )

	// 2. pagination
	const pagination = function() { 							// => ?page=2
		const page = +queryObj.page || 1
		const limit = +queryObj.limit || 4
		const skip = (page - 1) * limit

		this.query = this.query.skip(skip).limit(limit)
		return this
	}

	// 3. sorting 																// => ?sort=price,name
	const sort = function() {
		this.query = this.query.sort(queryObj.sort?.split(',').join(' '))
		return this
	}

	// 4. filter by fields
	const filter = function() { 									// => ?fields=name,price,rating
		this.query = this.query.select(queryObj.fields?.split(',').join(' '))
		return this
	}

	// 5. search
	const search = function() { 									// => ?search=name,value || ?search=product name
		const fieldName 	= queryObj.search?.split(',')[0] || 'name' 
		const searchValue = queryObj.search?.split(',')[1] || ''

		const searchObj = queryObj.search ? { [fieldName]: { $regex: searchValue, $options: 'i' }} : {}
		this.query = this.query.find(searchObj)

		return this
	}

	return {
		pagination,
		sort,
		search,
		filter,
		query
	}

}
