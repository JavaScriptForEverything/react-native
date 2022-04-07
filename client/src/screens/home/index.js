import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const HomeScreen = ( props) => {
	const { products } = useSelector( state => state.product )
	console.log(products)

	return (
		<View>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
		</View>
	)
}
export default HomeScreen

const styles = StyleSheet.create({

})