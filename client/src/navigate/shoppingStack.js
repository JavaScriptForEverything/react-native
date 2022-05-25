import { createStackNavigator } from '@react-navigation/stack';
import ShoppingScreen from '../screens/shopping';
import CartDetails from '../screens/shoppingDetails';

const shoppingStackItems = [
  { name: 'Shopping Screen', Component: ShoppingScreen },
  { name: 'Cart Details', Component: CartDetails },
]

const Stack = createStackNavigator()

// used in src/navigate/bottomNavigation.js
const ShoppingStack = () => {
  return (
    <Stack.Navigator>
      {shoppingStackItems.map(({ name, Component }) => (
        <Stack.Screen key={name}
          name={name}
          component={Component}
          options={{
            headerShown: name !== 'Shopping Screen'
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
export default ShoppingStack