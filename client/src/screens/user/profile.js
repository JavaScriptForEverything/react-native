import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { List, Divider, Text, ActivityIndicator, FAB } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { BASE_URL } from '@env'
import { deleteProductById, getAllUserProducts } from '../../store/userReducer'
import theme from '../../theme/color'
import NotFound from '../../components/notFound'


const ProfileScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { loading, token, products } = useSelector( state => state.user )

  // console.log(products)

  useEffect(() => dispatch(getAllUserProducts(token)), [token])

  const productHandler = (product) => () => {
    navigation.navigate('Product Details', { productId: product._id })
    // console.log(product.name)
  }

  const deleteIconHandler = (productId) => () => {
    dispatch(deleteProductById(token, productId))
  }
  const addProductHandler = () => {
    console.log('add product')
  }

  if(loading) return <ActivityIndicator style={styles.loader} size={40} color='dodgerblue' />
  if(!loading && !products.length) return <NotFound noResultFor='products' />

  return (
    <>
      <ScrollView>
        <View style={styles.container}>

          {products.map((product, index) => (
            <TouchableOpacity key={product.name} onPress={productHandler(product)}>
              <View>
                <List.Item
                  title={product.name}
                  // left={props => <List.Icon {...props} icon='account' />}
                  left={props => <Image {...props} 
                    source={{ uri: `${BASE_URL}/${product.coverPhoto.secure_url}` }} 
                    style={{ width: 50, height: 50 }}
                  />}
                  right={props => (
                    <List.Section>
                      <TouchableOpacity onPress={deleteIconHandler(product._id)}>
                        <MaterialCommunityIcons {...props} name='delete-outline' size={24} />
                      </TouchableOpacity>
                    </List.Section>
                  )}
                />
                <Divider style={styles.divider} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FAB 
        icon='plus'
        onPress={addProductHandler}
        style={styles.fabPlus}
        // color='red'
      />
    </>
  )
}
export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[300]
  },

  fabPlus: {
    position: 'absolute',
    right: 20,
    bottom: 20, 
    color: 'white',
    backgroundColor: 'dodgerblue'
  }
})