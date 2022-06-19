import { createStackNavigator } from '@react-navigation/stack'

import ProfilePaymentScreen from '../screens/user/profilePayments'
import UserPaymentDetailsScreen from '../screens/user/userPaymentDetails'

const stackItems = [
  { name: 'User Payments Stack', Component: ProfilePaymentScreen },
  { name: 'User Payments Details', Component: UserPaymentDetailsScreen },
]

const Stack = createStackNavigator()

// ./userProfileTabs.js
const UserPaymentStack = () => {
  return (
    <Stack.Navigator>
      { stackItems.map( item => (
        <Stack.Screen key={item.name}
          name={item.name}
          component={item.Component}
          options={{
            header: (navitation) => false   // => headerShown: false
          }}
        />
      ))}
    </Stack.Navigator>
  )  
}
export default UserPaymentStack