import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProducts } from '../../store/userReducer'
import { BASE_URL } from '@env'

import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text, List } from 'react-native-paper'

const ProfileProductScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { token, user } = useSelector(state => state.user)
  // const user  = useSelector(state => state.user)

  // console.log(user._id)
  // console.log('products: ', user.products?.length)
  // console.log('payments', user.payments?.length)

  console.log({ token })
  // console.log({ user })

  useEffect(() => {
    // if not condition check and wait, then it throw error, because user._id take time to get it.
    user._id && dispatch(getUserProducts(token, user._id))
  }, [user._id, token])


  const itemHandler = (productId) => () => {
    navigation.navigate('User Product Details', { productId })
  }

  const deleteHandler = (productId) => () => {
    console.log({ productId })
  }

  return (
    <View>
      { user.products?.map(product => (
        <TouchableOpacity key={product._id} onPress={itemHandler(product._id)}>
          <List.Item 
            title={product.name}
            description={product.summary}
            left={props => <Image 
              source={{ uri:  `${BASE_URL}/${product.coverPhoto.secure_url}` }} 
              // style={{ width: 50, height: 50 }}
              style={styles.listImage}
            />}
            right={props => (
              <TouchableOpacity onPress={deleteHandler(product._id)}>
                <List.Icon {...props} icon='delete-outline' />
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      ))}

    </View>
  )
}
export default ProfileProductScreen

const styles = StyleSheet.create({
  listImage: {
    aspectRatio: 1,
    resizeMode: 'cover'
  }
})