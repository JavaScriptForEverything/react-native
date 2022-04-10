import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Layout from '../../layout'

const ProfileScreen = () => {
  const navigation = useNavigation()

  return (
    <Layout>
      <View>
        <Text>Profile</Text>
        <Button onPress={() => navigation.navigate('Login')}>Login</Button>
        <Button onPress={() => navigation.navigate('Signup')}>Signup</Button>
        <Button onPress={() => navigation.navigate('Profile')}>Profile</Button>
        <Button onPress={() => navigation.navigate('Dashboard')}>Dashboard</Button>
      </View>
    </Layout>
  )
}
export default ProfileScreen

const styles = StyleSheet.create({

})