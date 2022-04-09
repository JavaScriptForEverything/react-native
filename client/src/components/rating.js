import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Rating = (props) => {
  const { color='#ffc107', value='', onPress=f=>f, disabled=false, size=24 } = props


  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, rating) => {

        const ratingValue = rating + 1

        return (
          <TouchableOpacity key={rating} disabled={disabled} onPress={() => onPress(ratingValue)} >
            <MaterialCommunityIcons
              name={ratingValue <= value ? 'star' : 'star-outline'}
              size={size} 
              color={color} 
            />
          </TouchableOpacity>
        )}
      )}

    </View>
  )
}
export default Rating

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
})