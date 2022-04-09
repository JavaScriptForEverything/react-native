import { ScrollView, StyleSheet, View } from 'react-native'

import Layout from '../../layout'
import SearchBar from './searchBar'
import Products from './product'

const HomeScreen = ( props) => {

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