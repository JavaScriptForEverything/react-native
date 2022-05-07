import { useSelector } from 'react-redux'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import theme from '../theme/color'
import HomeStack from './homeStack'
import AdminScreen from '../screens/admin'
import UserStack from './userStack'
import ShoppingStack from './shoppingStack'
// import ShoppingScreen from "../screens/shopping"

const tabItems = [
  { name: 'Shopping', Component: ShoppingStack, icon: 'cart' },
  { name: 'Home', Component: HomeStack, icon: 'home' },
  { name: 'Admin', Component: AdminScreen, icon: 'cog' },
  { name: 'User', Component: UserStack, icon: 'account' },
  // { name: 'User', Component: UserStack, icon: 'account' },
]

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {
  const { user } = useSelector( state => state.user )



  return (
    <Tab.Navigator 
      // initialRouteName='UserStack'
      barStyle={{ backgroundColor: theme.palette.primary.main }}
    >
      {tabItems
        .filter(item => (user?.role !== 'admin') ? (item.name !== 'Admin') : item)
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
