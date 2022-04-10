import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import theme from '../theme/color'
import HomeStack from './homeStack'
import AdminScreen from '../screens/admin'
import ShoppingScreen from "../screens/shopping"
import UserStack from './userStack'
import { useSelector } from 'react-redux'

const tabItems = [
  { name: 'Home', Component: HomeStack, icon: 'home' },
  { name: 'Admin', Component: AdminScreen, icon: 'cog' },
  { name: 'Shopping', Component: ShoppingScreen, icon: 'cart' },
  { name: 'User', Component: UserStack, icon: 'account' },
]

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {
  const { user } = useSelector( state => state.user )

  console.log(user.role)


  return (
    <Tab.Navigator 
      initialRouteName='SettingScreen'
      barStyle={{ backgroundColor: theme.palette.primary.main }}
    >
      {tabItems
        .filter(item => (user.role !== 'admin') ? (item.name !== 'Admin') : item)
        .map(({ name, Component, icon}) => (
        <Tab.Screen key={name}
          name={name}
          component={Component}
          options={{
            tabBarIcon: (props) => <MaterialCommunityIcons {...props} name={icon} size={24} />,
            tabBarBadge: name === 'Shopping' ? 5 : undefined
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
export default BottomTabs
