import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Caption, Subheading, Text, Title } from 'react-native-paper'
import Swiper from 'react-native-swiper'
import { BASE_URL } from '@env'

import Rating from '../../components/rating'
import theme from '../../theme/color'
import Category from '../../components/category'
import GoBack from '../../components/goBack'

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

const ProductDetails = ({ navigation, route: { params: { productId } } }) => {
  // console.log({ productId })

  const [ liked, setLiked ] = useState(false)
  const { products } = useSelector( state => state.user )
  const product = products.find( product => product._id === productId )

  const coverPhotoHandler = (coverPhoto) => () => {
    // console.log({ coverPhoto })
  }

  const categoryPressHandler = (category) => {
    console.log({ category })
  }
  const locationCategoryPressHandler = (category) => {
    console.log({ category })
  }

  
  if(!product) return <Text>No product found</Text>

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >

      <View style={styles.imageContainer}>
        <GoBack showLike={true} liked={liked} setLiked={setLiked} />
        <Image 
          source={{ uri: `${BASE_URL}/${product?.coverPhoto.secure_url}` }}
          style={styles.image}
          onLoad={coverPhotoHandler(product.coverPhoto.secure_url)}
        />
      </View>

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
          <Title>${product.price}</Title>
          <Text style={styles.priceSave} > Save ${(product.oldPrice - product.price) / 100}%</Text>
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

      <Swiper height='100%' >
        {product.images.map(image => (
          <Image 
            key={image.name}
            source={{ uri: `${BASE_URL}/${image?.secure_url}` }}
            style={styles.image}
          />
        ))}
      </Swiper>

      <View style={styles.descriptionContainer}>
        <Subheading style={styles.subheading}>Product Description:</Subheading>
        <Text style={styles.description}>{product.description}</Text>
      </View>

    </ScrollView>
  )
}
export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,            // take entire main-axis
  },
  image: {
    backgroundColor: 'dodgerblue',
    aspectRatio: 2,
    resizeMode: 'cover'
  },

  imageContainer: {
    position: 'relative'
  },
      imageHeartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        position: 'absolute',
        top: 16,
        left: 16, right: 16,
      },
        backContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
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
  },

  descriptionContainer: {
    padding: 8
  },
    subheading: {
      color: theme.palette.primary.main
    },
    description: {
      color: theme.palette.text.secondary,
      textAlign: 'justify',
      marginBottom: 24
    },
})