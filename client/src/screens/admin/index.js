import { StyleSheet, View, Text } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import NotFound from '../../components/notFound'
import Layout from '../../layout'

const SettingScreen = ( props) => {
	
	
	return (
		<Layout>
				<Text>Admin Screen</Text>

				<NotFound />
		</Layout>
	)
}
export default SettingScreen

const styles = StyleSheet.create({

})