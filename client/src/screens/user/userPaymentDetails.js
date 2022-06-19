import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'

const UserPaymentDetailsScreen = ({ navigation, route }) => {

  const { paymentId } = route.params

  const backHandler = () => navigation.goBack()
  

  return (
    <View style={{
      flex: 1,
    }}>
      <Text>Payment Details: {paymentId} </Text>
      <Button 
        mode='contained'
        onPress={backHandler}
        style={{
          // borderColor : 'red', borderWidth: 2,
          // flex: 1,
          // justifyContent: 'flex-end',
          // alignItems: 'flex-end'
        }}
      >Go Back</Button>
    </View>
  )
}
export default UserPaymentDetailsScreen

const styles = StyleSheet.create({

})