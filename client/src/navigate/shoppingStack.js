import { createStackNavigator } from '@react-navigation/stack';
import ShoppingScreen from '../screens/shopping';
import CartDetails from '../screens/shopping/cartDetails';

const shoppingStackItems = [
  { name: 'Cart Details', Component: CartDetails },
  { name: 'Shopping Screen', Component: ShoppingScreen },
]

const Stack = createStackNavigator()

const ShoppingStack = () => {
  return (
    <Stack.Navigator>
      {shoppingStackItems.map(({ name, Component }) => (
        <Stack.Screen key={name}
          name={name}
          component={Component}
          options={{
            headerShown: false
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
export default ShoppingStack