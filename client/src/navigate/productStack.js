import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from '../screens/productDetails'

const Stack = createStackNavigator()

const ProductStack = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Product Details'
        component={ProductDetails}
      />

    </Stack.Navigator>
  )
}
export default ProductStack