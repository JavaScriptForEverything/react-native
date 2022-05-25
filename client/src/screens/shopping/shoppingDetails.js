import { useDispatch, useSelector } from 'react-redux'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { addToCart, updateProduct } from '../../store/productReducer'
import { nextClicked } from '../../store/paymentReducer'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { List, Text, Title } from 'react-native-paper'
import { BASE_URL } from '@env'

import theme from '../../theme/color'
import StepperButton from '../../components/stepperButtons.js'
import { useNavigation } from '@react-navigation/native'
import ListIconMenu from '../../components/listIconMenu'

const title= 'Lorem ipsum dolor sit amet, consectetur'
const coverPhoto = require('../../../assets/favicon.png')
const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quidem et neque, omnis hic fuga! Ipsum quasi unde aut modi laboriosam, fuga tempora rerum similique debitis dolores at non asperiores?  '
const price = 54.32




// used into  .src/screens/shopping/StepContent.js
const ShoppingDetailsScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { step } = useSelector(state => state.payment)
  const { carts, products } = useSelector(state => state.product)


  const openMenuItemHandler = (product) => {
    navigation.navigate('Cart Details', { product })
    // navigation.navigate('Product Details', { product })
  }

  const removeListItem = (id) => async () => {
    /* 3: remove extra property which we added on clicking addToCart handler
    **    We added in top so that run before step-2: which may take some time
    */ 
    products.forEach(item => {
      dispatch(updateProduct({ ...item, isAddedToCart: false }))
    })

    // 1: remove from redux store
    const filteredCarts = carts.filter(item => item._id !== id)
    dispatch(addToCart(filteredCarts))

    // 2: remove from local store
    await AsyncStorageLib.setItem('carts', JSON.stringify(filteredCarts))

  }

  const submitHandler = () => {
    console.log('ShoppingDetails Need data from AddToCart localStorage')
    dispatch(nextClicked(step + 1))
  }

  return (
    <View>
      <Title style={styles.title}>Shopping Details</Title>

      {carts.map((cart, index, items) => (
        <TouchableOpacity key={cart._id} onPress={() => openMenuItemHandler(cart)}>
          <List.Item 
            title={cart.name}
            description={cart.summary || ''}
            left={(props) => <Image {...props} 
              source={{ uri: `${BASE_URL}/${cart.coverPhoto.secure_url}` }} 
              // style={{ width: 40, height: 40 }} 
              style={{ aspectRatio: 1 }}      // 1 => W:x, H:x,   2 => W:x, H: x*2
            />}
            right={(props) => (
              <View style={{ position: 'relative' }}>
                {/* <ListIconMenu {...props} 
                  product={cart}
                  menuItems={menuItems} 
                /> */}
                <TouchableOpacity onPress={removeListItem(cart._id)}>
                  <List.Icon {...props} icon='delete-outline' />
                </TouchableOpacity>
                <Text style={styles.right} >${cart.price}</Text>
              </View>
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
      
      <StepperButton 
        disabled={!carts.length}
        onPress={submitHandler} 
      />
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
      fontWeight: 'bold',

      position: 'absolute',
      top: 8,
      right: 8 * 5
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
      marginRight: 8
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