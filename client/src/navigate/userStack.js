import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/user/login'
import Signup from '../screens/user/signup'
import ForgotPassword from '../screens/user/forgotPassword'
import ResetPassword from '../screens/user/resetPassword'
import ProfileDrawer from './userDrawer'

import Dashboard from '../screens/user/dashboard'


const stackItems = [
  { name: 'Profile', Component: ProfileDrawer },
  { name: 'Login', Component: Login },
  { name: 'Signup', Component: Signup },
  { name: 'Forgot Password', Component: ForgotPassword },
  { name: 'Reset Password', Component: ResetPassword },

  // { name: 'Profile', Component: ProfileDrawer },
  { name: 'Dashboard', Component: Dashboard },
]

const Stack = createStackNavigator()

const UserStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName='Profile'
    >
      {stackItems.map(({ name, Component }) => (
        <Stack.Screen key={name}
          name={name}
          component={Component}
          options={{ 
            headerShown: false,       // hide the back navigation, to make as it is seperate screen
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
export default UserStack