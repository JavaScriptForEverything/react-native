import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { List, Divider } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { BASE_URL } from '@env'
import theme from '../../theme/color'


const ProfileScreen = () => {
  const navigation = useNavigation()

  const { user } = useSelector( state => state.user )

  // console.log(user.products)

  const productHandler = (product) => () => {
    navigation.navigate('Product Details', { productId: product._id })
    console.log(product.name)
  }

  const deleteIconHandler = (productId) => () => {
    console.log({ productId })
  }

  return (
    <View>
      {user.products.map((product, index) => (
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
  )
}
export default ProfileScreen

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[300]
  }
})