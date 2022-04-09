import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Button, Surface, Title } from 'react-native-paper'

import { BASE_URL } from '@env'
import theme from '../../theme/color'

const Product = () => {
  const navigation = useNavigation()

	const { error, products } = useSelector( state => state.product )
	// console.log(products)

	useEffect(() => {
		if(error) console.log(error)
	}, [error])

  const detailsHandler = (product) => () => {
    navigation.navigate('Product Details', { product })
  }

  const addToCartHandler = (product) => () => {
    console.log(product.id)
  }

  return (
    <View style={styles.container}>
      { products.map(product => (
        <View key={product.id} style={styles.item}>
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
              <TouchableOpacity onPress={addToCartHandler(product)} >
                <Button mode='contained' uppercase={false} >Add To Cart</Button>
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