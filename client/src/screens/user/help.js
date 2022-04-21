import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Title } from 'react-native-paper'

import SocialMedia from '../../components/socialMedia'

const Help = () => {
  const navigation = useNavigation()

  const profileButtonHandler = () => {
    console.log(navigation)
    navigation.navigate('User Profile')
  }

  return (
    <View>
      <Button 
        mode='contained'
        onPress={profileButtonHandler}
      >Show Profile Page</Button>

    <Title style={styles.title}>Process: (Under constructions)</Title>
    <SocialMedia />

    </View>
  )
}
export default Help

const styles = StyleSheet.create({
  title: {
    color: 'red',
    marginTop: 8 * 3 
  }
})