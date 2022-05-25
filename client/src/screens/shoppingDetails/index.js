import { useState } from 'react'
import { BASE_URL } from '@env'
import { StyleSheet, ScrollView, Image, View, TouchableOpacity } from 'react-native'
import { Avatar, Text, List, Subheading, Title, Button } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Rating from '../../components/rating'

import Layout from '../../layout'
import theme from '../../theme/color'

const ratingColor = '#ffc107'

const ProductDetails = ({ route }) => {
  const [ ratingValue, setRatingValue ] = useState('')


  const product = route.params?.product || {}
  // console.log(product.rating)
  // console.log(product.reviews)

  const ratingHandler = (newRatingValue) => {
    setRatingValue(newRatingValue)
  }

  const likeHandler = (reviewId) => () => {
    // console.log({ reviewId })
  }
  const unLikeHandler = (reviewId) => () => {
    // console.log({ reviewId })
  }
  const toAnswerHandler = (reviewId) => () => {
    // console.log({ reviewId })
  }

  // console.log(product)
  // return <Text>Product details</Text>

  return (
    <Layout>
      <ScrollView>
        <Image source={{
          uri: `${BASE_URL}/${product.coverPhoto.secure_url}`,
          height: 200,
          width: null,
          flex: 1,
        }}
        />
        <View style={styles.content}>
          <Title style={styles.title}>{product.name}</Title>
          <Subheading style={styles.summary}>{product.summary}</Subheading>


          <View style={styles.ratingContainer}>
            <Rating 
              color={ratingColor}
              value={Math.round(product.totalReview)}
              // onPress={ratingHandler}
              // disabled={true}
            />
            <Text style={styles.ratingItem}> ({product.reviews.length} reviews)</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {product.reviews.map(review => (

          <View style={styles.reviewContainer} key={review._id}>
            <View style={styles.reviewLeftSection}>
              <Avatar.Image source={{ uri: `${BASE_URL}/${product.coverPhoto.secure_url}`}} />
            </View>
            
            <View style={styles.reviewRightSection}>
              <View style={styles.reviewRightItem}>
                <Subheading style={styles.reviewTitle}>{review.user.name}</Subheading>
                <Text style={styles.reviewDate}>4 days ago</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.reviewMessage}>{review.review}</Text>
              </View>

              <View style={styles.reviewBottomContainer}>
                <View style={styles.reviewBottomItem}>
                  <TouchableOpacity onPress={likeHandler(review._id)}>
                    <MaterialCommunityIcons name='thumb-up-outline' size={24} color='grey'  />
                  </TouchableOpacity>
                  <Text style={styles.itemValue}>347</Text>
                </View>

                <View style={styles.reviewBottomItem}>
                  <TouchableOpacity onPress={unLikeHandler(review._id)}>
                    <MaterialCommunityIcons name='thumb-down-outline' size={24} color='grey'  />
                  </TouchableOpacity>
                  <Text style={styles.itemValue}>2</Text>
                </View>

                <View style={styles.reviewBottomItem}>
                  <TouchableOpacity onPress={toAnswerHandler(review._id)}>
                    <Button color={theme.palette.text.secondary} >To Answer</Button>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
          ))}

        </View>
      </ScrollView>
    </Layout>
  )
}
export default ProductDetails

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 8
  },
  title: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    marginVertical: 8
  },
  summary: {
    color: theme.palette.text.primary,
    marginBottom: 8,
    textTransform: 'capitalize'
  },

  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // overflow: 'scroll',
    // borderColor: 'red',
    // borderWidth: 1,
    marginBottom: 16,
  },
  reviewLeftSection: {
    marginRight: 8
  },
  reviewRightSection: {
    // flexDirection: 'row',
    // flexWrap: 'wrap'    
    // alignSelf: 'stretch',
    // textAlign: 'center'
  },
  reviewRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
  },
  reviewTitle: {
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    marginRight: 8
  },
  reviewDate: {
    color: theme.palette.text.secondary
  },
  messageContainer: {
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  reviewMessage: {
    color: theme.palette.text.secondary,
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingItem: {
    marginLeft: 8
  },
  description: {
    color: theme.palette.text.secondary,
    textAlign: 'justify', 
    marginBottom: 16
  },

  // review section
  reviewBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    // borderWidth: 1
  },
  reviewBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  itemValue: {
    marginLeft: 8
  }
})