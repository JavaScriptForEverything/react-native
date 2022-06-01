import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveInfo, nextClicked } from '../../store/paymentReducer'
import { arrayObjectAsObject, formValidator } from '../../util'

import { StyleSheet, View, Alert } from 'react-native'
import { HelperText, TextInput, Title } from 'react-native-paper'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import theme from '../../theme/color'

import StepperButton from '../../components/stepperButtons.js'

const inputItems = [
  { label: 'Full Name', name: 'name' },
  { label: 'Email Address', name: 'email', type: 'email-address' },
  { label: 'Country Name', name: 'country' },
  { label: 'Phone Number', name: 'phone', type: 'numeric' },
  { label: 'Street Address', name: 'address' },
  { label: 'Postal Code', name: 'code', type: 'numeric' },
]
const itemObject = arrayObjectAsObject(inputItems)

// used into  .src/screens/shopping/StepContent.js
const ShippingInfoScreen = () => {
  const dispatch = useDispatch()
  const [ fields, setFields ] = useState({...itemObject})
  const [ fieldsError, setFieldsError ] = useState({...itemObject})
  
  
  const { info, step } = useSelector( state => state.payment )
  const fn = async() => {
    let info =  await AsyncStorageLib.getItem('info')
        info = JSON.parse( info )
    setFields({ ...info })
  }

  // console.log({ fields })

  useEffect(() => {
    fn()
  }, [])

  
  const changeHandler = (name) => (text) => {
    formValidator(fields, setFieldsError)
    setFields({ ...fields, [name]: text})
  }

  const submitHandler = () => {
    const isValidated = formValidator(fields, setFieldsError)

    // console.log(fields)
    if( !true ) return Alert.alert(
      'Field Error', 
      'Every field must be filled up', 
      [
        { text: 'Close', onPress:(f) => f }
      ]
    )
    
    dispatch(saveInfo(fields))    // save into store + save on localStorage
    dispatch(nextClicked(step + 1))
  }



  return (
    <View>
      <Title style={styles.title}>Shipping Information</Title>

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

      <StepperButton onPress={submitHandler} />
    </View>
  )
}
export default ShippingInfoScreen

const styles = StyleSheet.create({
  title: {
    marginBottom: 8 * 3,
    textAlign: 'center',
    color: theme.palette.primary.main
  }
})