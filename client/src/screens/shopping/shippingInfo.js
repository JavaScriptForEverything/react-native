import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveInfo, nextClicked } from '../../store/paymentReducer'
import { arrayObjectAsObject, formValidator } from '../../util'

import { StyleSheet, View } from 'react-native'
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

const ShippingInfoScreen = () => {
  const dispatch = useDispatch()
  const [ fields, setFields ] = useState({...itemObject})
  const [ fieldsError, setFieldsError ] = useState({...itemObject})
  
  const { info, step } = useSelector( state => state.payment )
  const fn = async() => {
    const info = JSON.parse( await AsyncStorageLib.getItem('info'))
    setFields(info)
  }

  // console.log(info)

  useEffect(() => {
    fn()
  }, [])

  
  const changeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
    formValidator(fields, setFieldsError)
  }

  const submitHandler = () => {
    if( !formValidator(fields, setFieldsError) ) return
    
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