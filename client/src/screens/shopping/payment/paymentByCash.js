import { useDispatch, useSelector } from 'react-redux'
import { nextClicked, orderForCashOnDelivery } from '../../../store/paymentReducer'

import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useEffect } from 'react'


// used in : src/screens/shopping/payment.js
const PaymentByCash = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  const { carts } = useSelector(state => state.product )
  const { step, info, loading, status } = useSelector(state => state.payment)

  useEffect(() => {
    if(!loading && status === 'success') dispatch(nextClicked( step + 1))  // move to success page
  }, [loading, status])

  const orderHandler = () => {
    // 1. Send Data
    const totalPrice = carts.reduce((total, cart) => total = cart.price, 0)
    dispatch(orderForCashOnDelivery(token, { ...info, amount: totalPrice }))

    // 2. Send to success page by useEffect
  }

  return (
    <View>
      <Text style={styles.titleText}>Payment By Cash on Delievery</Text>

      <View style={styles.userInfo}>
        {Object.keys(info).map( (field) => (
          <Text key={field}> {[field]} : {info[field]} </Text>
        ))}
      </View>

      <Button
        mode='contained'
        onPress={orderHandler}
        uppercase={false}
        style={styles.orderButton}
        loading={loading}
      >Order Now</Button>
    </View>
  )
}
export default PaymentByCash

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: 16
  },
  userInfo: {
    marginTop: 8 * 2,
  },
  orderButton: {
    marginTop: 8 * 4,
    marginHorizontal: '20%'
  }
})