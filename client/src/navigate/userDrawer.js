import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../screens/user/profile'
import DrawerContent from '../screens/user/drawerContent'

const drawerItems = [
  { name: 'User Profile', Component: ProfileScreen },
]

const Drawer = createDrawerNavigator()

const UserDrawer = () => {
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