import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeScreen from '../screens/home'
import SettingScreen from '../screens/settings'
import ShoppingScreen from "../screens/shopping"
import UserScreen from '../screens/user'

const tabItems = [
  { name: 'Home', Component: HomeScreen, icon: 'home' },
  { name: 'Settings', Component: SettingScreen, icon: 'cog' },
  { name: 'Shopping', Component: ShoppingScreen, icon: 'cart' },
  { name: 'User', Component: UserScreen, icon: 'account' },
]

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {

  return (
    <Tab.Navigator 
      initialRouteName='SettingScreen'
      barStyle={{ backgroundColor: '#694fad' }}
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