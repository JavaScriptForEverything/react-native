import { createStackNavigator } from '@react-navigation/stack';
import ShoppingScreen from '../screens/shopping';

const Stack = createStackNavigator()

const ShoppingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Shopping Screen'
        component={ShoppingScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
export default ShoppingStack