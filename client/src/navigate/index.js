import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/home'
import DetailsScreen from '../screens/home/details'

const Stack = createStackNavigator()



const StackComponent = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='Details'
				component={DetailsScreen}
			/>
		</Stack.Navigator>
	)
}

export default StackComponent
