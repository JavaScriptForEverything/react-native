import { StyleSheet, View, Text } from 'react-native'

// used in : src/screens/shopping/payment.js
const PaymentByCash = () => {
  return (
    <View>
      <Text style={styles.titleText}>Payment By Cash on Delievery</Text>
    </View>
  )
}
export default PaymentByCash

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: 16
  },
})