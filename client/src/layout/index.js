import Toast from 'react-native-toast-message'
import { useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productReducer'
import { useNavigation } from '@react-navigation/native'
import { getMe } from '../store/userReducer'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const Layout = ({ isStack=false, children }) => {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const { token } = useSelector( state => state.user )

	useEffect( async() => {
		const savedToken = await AsyncStorageLib.getItem('token')

		const isTokenFound = token || savedToken
		if(!isTokenFound) return 
		
		dispatch(getMe(isTokenFound))
		navigation.navigate('User Profile')
	}, [token])
	
	return (
		<SafeAreaView style={{ ...styles.container, marginTop: isStack ? 0 : StatusBar.currentHeight }}>
				{ children }
			<Toast />
		</SafeAreaView>
	)
}
export default Layout

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: 'red',
	}
})