import { useEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { saveInfo } from '../../store/paymentReducer'
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

const ShippingInfoScreen = ({ step }) => {
  const [ submited, setSubmited ] = useState(false)
  const [ fields, setFields ] = useState({...itemObject})
  const [ fieldsError, setFieldsError ] = useState({...itemObject})
  
  const { screen } = useSelector( state => state.payment )
  
  const changeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
    // formValidator(fields, setFieldsError)

    setSubmited(true)
  }


  console.log(screen)
  // if(screen.isInfo)  console.log({ screen })

  //
  // if(step && submited && screen.isInfo) {
  if(submited && screen.isInfo) {
   saveInfo(fields) 
  }

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