import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/user/profile'
import ProductDetails from '../screens/user/productDetails'
import AddProduct from '../screens/user/addProduct';


const stackItems = [
  { name: 'User Product', Component: ProfileScreen },
  { name: 'Product Details', Component: ProductDetails },
  { name: 'Add Product', Component: AddProduct },
]

const Stack = createStackNavigator()

const ProductStack = () => {
  
  return (
    <Stack.Navigator>
      {stackItems.map(({ name, Component }) => (
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
export default ProductStack