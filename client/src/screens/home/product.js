import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateProduct } from '../../store/productReducer'
import { useNavigation } from '@react-navigation/native'
import asyncStorage from '@react-native-async-storage/async-storage'

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Surface, Title, Text } from 'react-native-paper'

import { BASE_URL } from '@env'
import theme from '../../theme/color'

// used into src/screens/home/index.js
const Product = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
	const { error, products, carts } = useSelector( state => state.product )
 
	useEffect(() => {
		if(error) console.log(error)
	}, [error])

  const detailsHandler = (product) => () => {
    navigation.navigate('Product Details', { product })
  }

  const addToCartHandler = (product) => async () => {

    // return console.log(product)

    // await asyncStorage.removeItem('carts')  // then save on localStorage
    // dispatch(addToCart([]))
    // return

    const cartAlreadyAdded = carts.find(item => item._id === product._id)
    if(cartAlreadyAdded) return alert('This product already added')

    dispatch(addToCart(carts.concat(product)))
    dispatch(updateProduct({...product, isAddedToCart: true }))
    await asyncStorage.setItem('carts', JSON.stringify(carts.concat(product)))  // then save on localStorage
  }

  return (
    <View style={styles.container}>
      { products.map(product => (
        <View key={product._id} style={styles.item}>
          <Surface style={styles.card}>
            <TouchableOpacity onPress={detailsHandler(product)} >
              <Image source={{ 
                uri: `${BASE_URL}/${product.coverPhoto.secure_url}`,
                height: 100,
                width: null,
                flex: 1
              }} />
            </TouchableOpacity>
            <View style={styles.cardContent}>
            <TouchableOpacity onPress={detailsHandler(product)} >
              <Title>{product.name}</Title>
            </TouchableOpacity>
              <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
              <TouchableOpacity disabled={product.isAddedToCart} onPress={addToCartHandler(product)} >
                <Button mode='contained' uppercase={false} disabled={product.isAddedToCart} >
                  { product.isAddedToCart ? 'Added to Cart' : 'Add To Cart' }
                </Button>
              </TouchableOpacity>
            </View>
          </Surface>
        </View>
      ))}
    </View>
  )
}
export default Product

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1
  },
  item: {
    width: '50%',
    marginBottom: 8,
  },
  card: {
    marginRight: 8
  },
  cardContent: {
    padding: 8
  },
  price: {
    marginVertical: 16,
    // fontWeight: 'bold',
    color: theme.palette.primary.dark
  }
})