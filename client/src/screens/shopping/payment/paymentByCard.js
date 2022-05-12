import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { arrayObjectAsObject, formValidator } from '../../../util'

import { StyleSheet, View } from 'react-native'
import { HelperText, TextInput, Text } from 'react-native-paper'

const inputItems = [
  { label: 'Currency', name: 'currency' },
  { label: 'Amount', name: 'amount' },
]
const itemObject = arrayObjectAsObject(inputItems)



const PaymentByCard = () => {
  const [ fields, setFields ] = useState({...itemObject})
  const [ fieldsError, setFieldsError ] = useState({...itemObject})

  const changeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
    formValidator(fields, setFieldsError)
    // save into store + save on localStorage
    // dispatch(saveInfo({ ...fields, [name]: text}))
  }

  return (
    <View>
      <Text style={styles.titleText}>Payment By Card</Text>
      {inputItems.map(({ label, name, type}) => (
        <View key={name}>
          <TextInput
            mode='outlined'
            label={label}
            placeholder={label}
            keyboardType={type ? type : 'default'}
            value={fields[name]}
            onChangeText={changeHandler(name)}
            error={!!fieldsError[name] || !fields[name]}
            style={{ marginBottom: 8 }}
          />
          {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> }
        </View>
      ))}
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
