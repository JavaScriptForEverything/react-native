import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { List, Divider, Text, Button } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { BASE_URL } from '@env'
import theme from '../../theme/color'
import { useSelector } from 'react-redux'

const productItems = [
  { title: 'product name 1', image: 'static/images/users/default.jpg' },
  { title: 'product name 2', image: 'static/images/users/default.jpg' },
  { title: 'product name 3', image: 'static/images/users/default.jpg' },
  { title: 'product name 4', image: 'static/images/users/default.jpg' },
]

const ProfileScreen = () => {

  const { user } = useSelector( state => state.user )
  console.log(user)

  const deleteIconHandler = (index) => () => {
    console.log({ index })
  }

  return (
    <View>
      {productItems.map(({ title, image }, index) => (
        <View key={title}>
          <List.Item
            title={title}
            // left={props => <List.Icon {...props} icon='account' />}
            left={props => <Image {...props} 
              source={{ uri: `${BASE_URL}/${image}` }} 
              style={{ width: 50, height: 50 }}
            />}
            right={props => (
              <List.Section>
                <TouchableOpacity onPress={deleteIconHandler(index)}>
                  <MaterialCommunityIcons {...props} name='delete-outline' size={24} />
                </TouchableOpacity>
              </List.Section>
            )}
          />
          <Divider style={styles.divider} />
        </View>
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