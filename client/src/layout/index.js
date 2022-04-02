import { StyleSheet, SafeAreaView } from 'react-native'

const Layout = ({ children }) => {
	return (
		<SafeAreaView>
			{ children }
		</SafeAreaView>
	)
}
export default Layout

const styles = StyleSheet.create({

})
