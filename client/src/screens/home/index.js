import { useDispatch } from 'react-redux'
import { getProducts } from '../../store/productReducer'
import { ScrollView, StyleSheet, View } from 'react-native'

import Layout from '../../layout'
import SearchBar from './searchBar'
import Products from './product'
import { useEffect } from 'react'

const HomeScreen = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
	}, [])


	return (
		<Layout>
			<ScrollView>
				<View style={styles.searchbar}>
					<SearchBar />
				</View>
				<Products />
			</ScrollView>
		</Layout>
	)
}
export default HomeScreen

const styles = StyleSheet.create({
	searchbar: {
		marginBottom: 8
	}
})