import { createStackNavigator } from '@react-navigation/stack'

import ProfileProductScreen from '../screens/user/profileProduct'
import ProductDetailsScreen from '../screens/productDetails'

const stackItems = [
  { name: 'User Product Stack', Component: ProfileProductScreen },
  { name: 'User Product Details', Component: ProductDetailsScreen },
]

const Stack = createStackNavigator()

const UserProductStack = () => {
  return (
    <Stack.Navigator>
      {stackItems.map( item => (
        <Stack.Screen key={item.name}
          name={item.name}
          component={item.Component}
          options={{
            header: (navigation) => false
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
export default UserProductStack