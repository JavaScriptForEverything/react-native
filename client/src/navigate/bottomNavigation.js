import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, View, Text } from 'react-native'
import { Badge } from 'react-native-paper'

import theme from '../theme/color'
import HomeStack from './homeStack'
import AdminScreen from '../screens/admin'
import UserStack from './userStack'
// import ShoppingScreen from '../screens/shopping'
import ShoppingStack from './shoppingStack'
import { addToCart } from '../store/productReducer'

const tabItems = [
  { name: 'User', Component: UserStack, icon: 'account' },
  { name: 'Home', Component: HomeStack, icon: 'home' },
  { name: 'Admin', Component: AdminScreen, icon: 'cog' },
  { name: 'Shopping', Component: ShoppingStack, icon: 'cart' },
]

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {
  const { user } = useSelector( state => state.user )
  const { carts } = useSelector( state => state.product )

  const numberOfCarts = carts.length
  // console.log(numberOfCarts)

  const getCartItems = async () => {
    let localCarts =  await AsyncStorageLib.getItem('carts') 
        localCarts = JSON.parse( localCarts )
    localCarts && addToCart(localCarts)
  }

  useEffect(() => {
    getCartItems()
  }, [])


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
            tabBarIcon: (props) => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons {...props} name={icon} size={24} />
                { name === 'Shopping' && !!numberOfCarts && (
                  <Badge style={styles.badge}>{numberOfCarts}</Badge> 
                )}
              </View>
            )
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
export default BottomTabs

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
  },
    badge: {
      position: 'absolute',
      left: 8 * 2,
      top: -4,
      fontSize: 12,
    }
})