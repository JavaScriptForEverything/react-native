import Toast from 'react-native-toast-message'
import { useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getMe } from '../store/userReducer'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { addToCart } from '../store/productReducer'

const Layout = ({ isStack=false, children }) => {
	const dispatch = useDispatch()
	const navigation = useNavigation()

  const getCartItems = async () => {
    let localCartItems = await AsyncStorageLib.getItem('carts')
        localCartItems = JSON.parse(localCartItems)
    localCartItems?.length && dispatch( addToCart(localCartItems) )
  }
  useEffect(() => getCartItems(), [])


	useEffect( async() => {
		const token = await AsyncStorageLib.getItem('token')
		if(!token) return 

		dispatch(getMe(token))
		// navigation.navigate('Profile')
	}, [])
	
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