import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextClicked } from '../../../store/paymentReducer'

import { StyleSheet, View } from 'react-native'
import { HelperText, TextInput, Text } from 'react-native-paper'

import { arrayObjectAsObject, formValidator } from '../../../util'
import StepperButton from '../../../components/stepperButtons'

const inputItems = [
  { label: 'Currency', name: 'currency' },
  { label: 'Amount', name: 'amount' },
]
const itemObject = arrayObjectAsObject(inputItems)



// used in : src/screens/shopping/payment.js
const PaymentByCard = () => {
  const dispatch = useDispatch()

  const [ fields, setFields ] = useState({ ...itemObject, currency: 'BDT' })
  const [ fieldsError, setFieldsError ] = useState({...itemObject})

  const { carts } = useSelector(state => state.product)
  const { info } = useSelector(state => state.payment)

  const amount = carts.reduce((total, cart) => total + cart.price, 0)
  // console.log({ amount })

  const changeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
    formValidator(fields, setFieldsError)
  }

  const submitHandler = () => {
    console.log({ ...fields, amount, user: info })

    // dispatch(nextClicked(step + 1))
  }
  return (
    <View>
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
            onChangeText={changeHandler(name)}
            error={!!fieldsError[name] || !fields[name]}
            style={{ marginBottom: 8 }}
          />
          {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> }
        </View>
      ))}

      <StepperButton onPress={submitHandler} />
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
