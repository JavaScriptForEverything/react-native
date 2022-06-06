import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPayment, nextClicked } from '../../../store/paymentReducer'
import { StripeProvider } from '@stripe/stripe-react-native'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'

import { StyleSheet, View, Alert } from 'react-native'
import { TextInput, Text } from 'react-native-paper'

import { arrayObjectAsObject } from '../../../util'
import { getStripePublishableKey } from '../../../store/paymentReducer'
import StepperButton from '../../../components/stepperButtons'

const inputItems = [
  { label: 'Currency', name: 'currency' },
  { label: 'Amount', name: 'amount' },
]
const itemObject = arrayObjectAsObject(inputItems)



// used in : src/screens/shopping/payment.js
const PaymentByCard = () => {
  const dispatch = useDispatch()

  const [ fields, setFields ] = useState({ ...itemObject, currency: 'USD' })
  const [ fieldsError, setFieldsError ] = useState({...itemObject})
  const [ cardDetails, setCardDetails ] = useState({})

  const { carts } = useSelector(state => state.product)
  const { publishableKey, step, info } = useSelector(state => state.payment)
  const { token } = useSelector(state => state.user)

  const amount = carts.reduce((total, cart) => total + cart.price, 0)
  const { loading, confirmPayment } = useConfirmPayment()

  // const changeHandler = (name) => (text) => {
  //   setFields({ ...fields, [name]: text})
  //   formValidator(fields, setFieldsError)
  // }

  useEffect(() => {
    dispatch(getStripePublishableKey())
  }, [])

  const cardChangeHandler = (newCardDetails) => setCardDetails(newCardDetails)
  const submitHandler = async () => {
    // Step-1: 
    if(!cardDetails.complete) return Alert.alert(
      'Card Error',
      'Please Enter complete Card Details',
      [ { text: 'Close' } ]
    )

    // Step-2: get clientSecret from backend, after getting publishableKey
    // dispatch(addPayment(token, { amount, ...info }))
    const clientSecret = await addPayment(token, { amount, ...info })

    // Step-3: Confirm payment
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: info
    })
    if(error) return Alert.alert(
      'Payment Failed', 
      `Payment method failed: ${error.message}`, 
      [ { text: 'Cancel' } ]
    )

    // Step-4: Show success and redirect to success page
    console.log( paymentIntent )
    dispatch(nextClicked(step + 1))  // move to success page

  }
  return (
    <View>
      <StripeProvider publishableKey={publishableKey}>

      <Text style={styles.titleText}>Payment By Card</Text>
      {inputItems.map(({ label, name, type}) => name === 'amount' ? (
        <View key={name}>
          <TextInput
            mode='outlined'
            label={label}
            placeholder={label}
            value={`${amount}`}
            // onChangeText={changeHandler(name)}
            // error={!!fieldsError[name] || !fields[name]}
            style={{ marginBottom: 8 }}
            disabled={true}
          />
          {/* {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> } */}
        </View>
      ) : (
        <View key={name}>
          <TextInput
            autoCapitalize='characters'
            mode='outlined'
            label={label}
            placeholder={label}
            keyboardType={type ? type : 'default'}
            value={fields[name].toUpperCase()}                      // value will be dropdown menu
            // onChangeText={changeHandler(name)}
            // error={!!fieldsError[name] || !fields[name]}
            style={{ marginBottom: 8 }}
            disabled={true}
          />
          {/* {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> } */}

        </View>
      ))}

      <CardField 
        postalCodeEnabled={false}
        placeholder={{ number: '4242 4242 4242 4242' }}
        onCardChange={cardChangeHandler}
        style={{
          height: 50,                         // mandatory style, else card will be hidden
          backgroundColor: 'dodgerblue',
          // borderWidth: 1,
          // borderColor: 'dodgerblue'
        }}
        cardStyle={{
          // height: 50,                         // mandatory style, else card will be hidden
          // backgroundColor: 'dodgerblue',
          // borderWidth: 1,
          // borderColor: 'dodgerblue'
        }}
      />


      <StepperButton loading={loading} disabled={loading} onPress={submitHandler} />

      </StripeProvider>
    </View>
  )
}
export default PaymentByCard

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8 * 2
  },
})
