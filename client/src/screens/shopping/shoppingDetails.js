import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextClicked } from '../../store/paymentReducer'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { List, Text, Title } from 'react-native-paper'
import { BASE_URL } from '@env'

import theme from '../../theme/color'
import StepperButton from '../../components/stepperButtons.js'
import { useNavigation } from '@react-navigation/native'

const title= 'Lorem ipsum dolor sit amet, consectetur'
const coverPhoto = require('../../../assets/favicon.png')
const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quidem et neque, omnis hic fuga! Ipsum quasi unde aut modi laboriosam, fuga tempora rerum similique debitis dolores at non asperiores?  '
const price = 54.32



const cartItems = [
  { _id: 'cart.id-1', coverPhoto, title, description, price },
  { _id: 'cart.id-2', coverPhoto, title, description, price },
  { _id: 'cart.id-3', coverPhoto, title, description, price },
]

const ShoppingDetailsScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { step } = useSelector(state => state.payment)
  const { carts } = useSelector(state => state.product)

  const deleteHandler = (id) => () => {
    console.log({ id })
    console.log('create new Stack here for product details again so that user can easyly go back')

    navigation.navigate('Cart Details')
  }


  const submitHandler = () => {
    console.log('ShoppingDetails Need data from AddToCart localStorage')
    dispatch(nextClicked(step + 1))
  }

  return (
    <View>
      <Title style={styles.title}>Shopping Details</Title>

      {carts.map((cart, index, items) => (
        <TouchableOpacity key={cart._id} onPress={deleteHandler(cart._id)}>
          <List.Item 
            title={cart.name}
            description={cart.summary || ''}
            left={(props) => <Image {...props} 
              source={{ uri: `${BASE_URL}/${cart.coverPhoto.secure_url}` }} 
              // style={{ width: 40, height: 40 }} 
              style={{ aspectRatio: 1 }}      // 1 => W:x, H:x,   2 => W:x, H: x*2
            />}
            right={(props) => (
                <Text style={{
                  ...styles.right,
                  marginTop: cart.description ? 10 : 14,
                }} >${cart.price}</Text>
            )}
            style={styles.listItem}
          />
        </TouchableOpacity>
      ))}

      <View style={styles.totalContainer}>
        <View style={styles.leftItem}>
          <Text style={styles.heading}> Items </Text>
          <Text style={styles.item}>:</Text>
          <Text>{carts.length}</Text>
        </View>

        <View style={styles.rightItem}>
          <Text style={styles.heading}> Total </Text>
          <Text style={styles.item}>:</Text>
          <Text>${carts.reduce((total, product) => total + product.price, 0)}</Text>
        </View>
      </View>
      
      <StepperButton onPress={submitHandler} />
    </View>
  )
}
export default ShoppingDetailsScreen

const styles = StyleSheet.create({
  title: {
    marginBottom: 8 * 3,
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#0002'
  },
    right: {
      marginLeft: 8 * 2,
      color: theme.palette.primary.dark,
      fontWeight: 'bold'
    },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8 * 2,
  },
    leftItem: {
      // flex: .6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightItem: {
      // flex: .4,
      flexDirection: 'row',
      alignItems: 'center',
    },
      heading: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        fontSize: 18,
      },
      item: {
        marginHorizontal: 8
      }

})