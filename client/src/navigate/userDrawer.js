import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import ProfileScreen from '../screens/user/profile'
import DrawerContent from '../screens/user/drawerContent'
import AboutMeScreen from '../screens/user/aboutMe'           // 1. 
import ContactUsScreen from '../screens/user/contactUs'       // 2
import HelpScreen from '../screens/user/help'                 // 3


const drawerItems = [
  { name: 'User Profile', Component: ProfileScreen },   // Main Profile page
  { name: 'About Me', Component: AboutMeScreen },
  { name: 'Contact Us', Component: ContactUsScreen },
  { name: 'Help', Component: HelpScreen },
]

const Drawer = createDrawerNavigator()

const UserDrawer = () => {
  const navigation = useNavigation()
  const { token } = useSelector( state => state.user )

  useEffect(() => {
    if(!token) return navigation.navigate('Login')

  }, [token])


  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      {drawerItems.map(({ name, Component}) => (
        <Drawer.Screen key={name}
          name={name}
          component={Component}
        />
      ))}
    </Drawer.Navigator>
  )
}
export default UserDrawer