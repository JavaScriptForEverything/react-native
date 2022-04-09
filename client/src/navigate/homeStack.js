import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/home'
import DetailsScreen from '../screens/productDetails'

const stackItems = [
  { name: 'Home Screen', Component: HomeScreen, icon: 'home' },
  { name: 'Product Details', Component: DetailsScreen, icon: 'cog' },
]

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName='Product Details'     // reload to take effect
    >
      {stackItems.map(({ name, Component }) => (
        <Stack.Screen key={name}
          name={name}
          component={Component}
          options={{
            // headerShown: false       // hide the top back navigation
          }}
        />
      ))}

    </Stack.Navigator>
  )
}
export default StackNavigator


