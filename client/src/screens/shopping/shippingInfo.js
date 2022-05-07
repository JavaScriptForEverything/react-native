import { useEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { arrayObjectAsObject, formValidator } from '../../util'

const inputItems = [
  { label: 'Full Name', name: 'name' },
  { label: 'Email Address', name: 'email', type: 'email-address' },
  { label: 'Country Name', name: 'country' },
  { label: 'Phone Number', name: 'phone', type: 'numeric' },
  { label: 'Street Address', name: 'address' },
  { label: 'Postal Code', name: 'code', type: 'numeric' },
]
const itemObject = arrayObjectAsObject(inputItems)

const ShippingInfoScreen = (props) => {
  const [ fields, setFields ] = useState({...itemObject})
  const [ fieldsError, setFieldsError ] = useState({...itemObject})
  
  
  const changeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
    formValidator(fields, setFieldsError)
  }

  // console.log({ step })
  console.log(props)

  return <></>

  return (
    <View>
      <KeyboardAvoidingView>

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
          />
          {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> }
        </View>
      ))}
      </KeyboardAvoidingView>
    </View>
  )
}
export default ShippingInfoScreen

const styles = StyleSheet.create({

})