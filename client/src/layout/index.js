import Toast from 'react-native-toast-message'
import { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productReducer'
import { useNavigation } from '@react-navigation/native'
import { getMe } from '../store/userReducer'

const Layout = ({ isStack=false, children }) => {
	const dispatch = useDispatch()
	const { token, authenticated, user } = useSelector( state => state.user )

	// const navigation = useNavigation()
	// console.log(user, authenticated)

	useEffect(() => {
		// dispatch(getProducts())
	}, [])


	/* 	AUTHENTICATION: Here
	** 1. GET user if token available
	** 2. if user found push user to 'Profile' navigation Route which we define in userNavigation Stack
	*/
	useEffect(() => {
		if(token) dispatch(getMe(token))
		// if(Object.keys(user).length) 	navigation.navigate('Profile', { user })
	}, [token])
	
	return (
		<SafeAreaView style={{ marginTop: isStack ? 0 : StatusBar.currentHeight }}>
			{ children }
			<Toast />
		</SafeAreaView>
	)
}
export default Layout
