import Toast from 'react-native-toast-message'
import { StyleSheet, View, Text } from 'react-native'
import Layout from '../../layout'
import { Button } from 'react-native-paper'

const ForgotPasswordScreen = () => {

  const pressHandler = () => {
    Toast.show({
      type: 'success',
      text1: 'Success fully loged in'
    })
  }

  return (
    <Layout>
      <View>
        <Text>Forgot Password</Text>
        <Button
          mode='contained'
          onPress={pressHandler}
        >Show alert</Button>
      </View>
    </Layout>
  )
}
export default ForgotPasswordScreen

const styles = StyleSheet.create({

})