import { useSelector } from 'react-redux'
import { BASE_URL } from '@env'

import { StyleSheet, View, Image } from 'react-native'
import { Caption, Subheading, Text, Title } from 'react-native-paper'

import Rating from '../../components/rating'
import theme from '../../theme/color'
import Category from '../../components/category'

const categories = [
  { icon: 'home', label: 'shirt' },
  { icon: 'home', label: 'pant' },
  { icon: 'home', label: 't-shirt' },
  { icon: 'home', label: 'ladies-shirt' },
  { icon: 'home', label: 'gens-shirt' },
  { icon: 'home', label: 'stuck' },
]

const locationCategories = [
  { icon: 'map-marker', label: 'Near By' },
  { icon: 'cellphone', label: 'Mobile Ticket' },
  { icon: 'car', label: 'Hotel Pickup' },
]

const ProductDetails = ({ route: { params: { productId } } }) => {
  // console.log({ productId })

  const { user } = useSelector( state => state.user )
  const product = user.products.find( product => product._id === productId )

  // console.log(product)

  const coverPhotoHandler = () => {
    console.log('Image uploaded')
  }

  const categoryPressHandler = (category) => {
    console.log({ category })
  }
  const locationCategoryPressHandler = (category) => {
    console.log({ category })
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: `${BASE_URL}/${product?.coverPhoto.secure_url}` }}
        style={styles.coverPhoto}
        onLoad={coverPhotoHandler}
      />

      <View style={styles.imageTitleContainer}>
        <View style={styles.imageTitleContainerLeft}>
          <Subheading style={styles.title}>{product.name}</Subheading>

          <View style={styles.ratingContainer}>
            <Rating 
              value={product.rating}
              disabled={true}
              size={20}
            />
            <Text style={styles.ratingReview}>{2} ( Reviews )</Text>
          </View>
        </View>

        <View style={styles.imageTitleContainerRight}>
          {product.oldPrice && <Caption>From ${product.oldPrice}</Caption> }
          <Title>${product.price.toFixed(2)}</Title>
          <Text style={styles.priceSave} > Save ${product.price/100}%</Text>
        </View>
      </View>

      <Category 
        style={styles.category}
        data={categories}
        onPress={categoryPressHandler}
        border={true}
        containerBorder={true}
        // showIcon={true}
        // iconColor='dodgerblue'
      />

      <Category 
        style={styles.category}
        data={locationCategories}
        onPress={locationCategoryPressHandler}
        border={true}
        containerBorder={true}
        showIcon={true}
        // iconColor='dodgerblue'
      />

    </View>
  )
}
export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,            // take entire main-axis
  },
  coverPhoto: {
    backgroundColor: 'dodgerblue',
    aspectRatio: 2,
    resizeMode: 'cover'
  },

  imageTitleContainer: {
    // borderWidth: 2, borderColor: 'red',
    flexDirection: 'row',
    padding: 8
  },
    imageTitleContainerLeft: {
      // borderWidth: 1, borderColor: 'blue',
      flex: .7
    },
      title: {
        textTransform: 'capitalize'
      },
      ratingContainer: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
      },
        ratingReview: {
          marginLeft: 16
        },

    imageTitleContainerRight: {
      // borderWidth: 1, borderColor: 'orange',
      flex: .3,
      alignItems: 'center'
    },
      priceSave: {
        // backgroundColor: 'dodgerblue',
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
        padding: 8,
        marginTop: 8
      },
  
  category: {
    marginVertical: 8,
    // marginHorizontal: 4
  }


})