import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'

import SocialMedia from '../../components/socialMedia'

const Help = () => {

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Process: (Under constructions)</Title>
      <SocialMedia />
    </View>
  )
}
export default Help

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'red',
    marginTop: 8 * 3 
  }
})