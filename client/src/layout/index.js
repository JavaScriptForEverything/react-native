import { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProducts } from '../store/productReducer'

const Layout = ({ children }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	
	return (
		<SafeAreaView>
			{ children }
		</SafeAreaView>
	)
}
export default Layout
