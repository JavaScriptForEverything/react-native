import { createDrawerNavigator } from '@react-navigation/drawer'

import DrawerContent from '../screens/user/drawerContent'
import ProductStack from './productStack'
// import ProfileScreen from '../screens/user/profile'
import AboutMeScreen from '../screens/user/aboutMe'           // 1. 
import ContactUsScreen from '../screens/user/contactUs'       // 2
import HelpScreen from '../screens/user/help'                 // 3
import Logout from '../screens/user/logout'                 // 3


const drawerItems = [
  { name: 'About Me', Component: AboutMeScreen },
  { name: 'User Profile', Component: ProductStack },   // Main Profile page
  // { name: 'About Me', Component: AboutMeScreen },
  { name: 'Contact Us', Component: ContactUsScreen },
  { name: 'Help', Component: HelpScreen },
]

const Drawer = createDrawerNavigator()

const UserDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      {drawerItems.map(({ name, Component}) => (
        <Drawer.Screen key={name}
          name={name}
          component={Component}
          options={{
            headerRight: (props) => <Logout {...props} />
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}
export default UserDrawer