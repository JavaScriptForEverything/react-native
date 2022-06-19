import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import UserProductStack from './userProductStack'
import UserPaymentStack from './userPaymentStack'


const Tab = createMaterialTopTabNavigator()


const tabItems = [
  { name: 'User Products', Component: UserProductStack },
  { name: 'User Payments', Component: UserPaymentStack },
]

//  ./navigate/userProfileTabs.js
const TopTabs = () => {
  return (
    <Tab.Navigator>
      {tabItems.map(({ name, Component }) => (
        <Tab.Screen key={name}
          name={name}
          component={Component}
        />
      ))}
    </Tab.Navigator>
  )
}
export default TopTabs