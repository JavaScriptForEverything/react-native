import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { socialMediaItems } from '../data/user'


/* <SocialMedia />
** Used in [ 
**   /screens/user/AboutMe.js
** ]
*/ 
const SocialMedia = () => {

  const socialMediaHandler = (path) => () => {
    Linking.openURL(path)
  }

  return (
    <View style={styles.socialMedia}>
      { socialMediaItems.map(({ icon, path }) => (
        <TouchableOpacity key={icon} onPress={socialMediaHandler(path)}>
          <MaterialCommunityIcons name={icon} size={24} />
        </TouchableOpacity>
      ))}
    </View>
  )
}
export default SocialMedia

const styles = StyleSheet.create({
  socialMedia: {
    flexDirection: 'row',
    marginVertical: 8 * 2,
    marginHorizontal: 8 * 6,
    justifyContent: 'space-evenly'
  },
})