import { NavigationHelpersContext } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Layout from '../../layout'

const CartDetails = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate('Shopping Screen')
  }
  return (
    <Layout>
      <Button onPress={pressHandler}>Payment Details</Button>
      <View>
        <Text>Cart Details</Text>
      </View>
    </Layout>
  )
}
export default CartDetails

const styles = StyleSheet.create({

})