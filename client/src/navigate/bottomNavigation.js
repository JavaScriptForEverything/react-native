import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import theme from '../theme/color'
import HomeStack from './homeStack'
import SettingScreen from '../screens/settings'
import ShoppingScreen from "../screens/shopping"
import UserScreen from '../screens/user'

const tabItems = [
  { name: 'Home', Component: HomeStack, icon: 'home' },
  { name: 'Admin', Component: SettingScreen, icon: 'cog' },
  { name: 'Shopping', Component: ShoppingScreen, icon: 'cart' },
  { name: 'User', Component: UserScreen, icon: 'account' },
]

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {

  return (
    <Tab.Navigator 
      initialRouteName='SettingScreen'
      barStyle={{ backgroundColor: theme.palette.primary.main }}
    >
      {tabItems.map(({ name, Component, icon}) => (
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
