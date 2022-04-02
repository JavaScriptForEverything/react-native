import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'

// import Layout from '../../layout'

const Home = () => {
	const navigation = useNavigation()

	const pressHandler = () => {
		navigation.navigate('Details')
	}


	return (
		<View>
			<Text>Home</Text>
			<Button
				mode='outlined'
				onPress={pressHandler}
			>Product Details </Button>
		</View>
	)
}
export default Home

const styles = StyleSheet.create({

})

