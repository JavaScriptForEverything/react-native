import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Layout from '../../layout'


const DrawerContent = () => {
  const { user } = useSelector( state => state.user )

  // console.log({ token: user.token })
  // console.log(user.avatar.secure_url)

  const logoutHandler = () => {
    console.log('Logout')
  }

  return (
    <Layout>
      <View>
        <Text>Drawer updated</Text>
        <Button onPress={logoutHandler}>Logout</Button>
      </View>
    </Layout>
  )
}
export default DrawerContent

const styles = StyleSheet.create({

})