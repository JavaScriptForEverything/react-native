import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const GoBack = ({ showLike=false, liked=false, setLiked=f=>f }) => {
  const navigation = useNavigation()

  const backHandler = () => navigation.goBack()
  const likePressedHandler = () => {
    setLiked(!liked)
    console.log('liked')
  }


  return (
    <View style={styles.imageHeartContainer}>
      <TouchableOpacity onPress={backHandler} style={styles.backContainer}>
        <MaterialCommunityIcons name='arrow-left-bold-outline' size={24} />
        <Text>Back</Text>
      </TouchableOpacity>

      {showLike && (
        <TouchableOpacity onPress={likePressedHandler}>
          <MaterialCommunityIcons name={ liked ? 'heart' : 'heart-outline' } size={24} color='#f60000' />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default GoBack

const styles = StyleSheet.create({
  imageHeartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    top: 16,
    left: 16, right: 16,
    zIndex: 1000
  },
    backContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
})