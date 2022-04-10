import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { arrayObjectAsObject, formValidator } from '../../util'
import { sendForgotPasswordRequest } from '../../store/userReducer'

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput, Title } from 'react-native-paper'
import Layout from '../../layout'
import theme from '../../theme/color'

const inputItems = [
  { label: 'Email Address', name: 'email',  icon: 'email' },
]
const inputItemsAsObject = arrayObjectAsObject(inputItems, 'name')

// get only password fields so that we can show or hide only them dynamically
const filterPasswordItems = inputItems.filter(obj => obj.type === 'password')
const passwordItemsAsObject = arrayObjectAsObject(filterPasswordItems, 'name')

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { error, loading, forgotPasswordMessage } = useSelector(state => state.user)

  const [ showPassword, setShowPassword ] = useState({ ...passwordItemsAsObject })
  const [ fields, setFields ] = useState({ ...inputItemsAsObject })
  const [ fieldsError, setFieldsError ] = useState({ ...inputItemsAsObject })

  useEffect(() => {
    if(error) console.log(error)
    if(forgotPasswordMessage) {
      // setTimeout(() => navigation.navigate('Reset Password') , 2000);
      // Toast.show({
      //   status: 'success',
      //   text1: forgotPasswordMessage
      // })
    }
  }, [error, forgotPasswordMessage])

  const loginHandler = () => navigation.navigate('Reset Password')
  
  const showPasswordHandler = (name) => () => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name]})
  }

  const changeHandler = (name) => (value) => {
    setFields({ ...fields, [name]: value })
  }
  const forgotPasswordHandler = () => navigation.navigate('Reset Password')

  const submitHandler = () => {
    if( !formValidator(fields, setFieldsError)) return
    dispatch(sendForgotPasswordRequest(fields))
    // console.log(fields)
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Forgot Password</Title>
        {inputItems.map(({ name, label, icon, type }) => (
          <View key={name}>
            <TextInput
              label={label}
              placeholder={label}
              value={fields[name]}
              secureTextEntry={type === 'password' && !showPassword[name]}
              onChangeText={changeHandler(name)}
              onEndEditing={submitHandler}
              left={<TextInput.Icon name={icon} color='grey' />}
              right={ type === 'password' ? (
                <TextInput.Icon 
                  name={showPassword[name] ? 'eye-off' : 'eye'}
                  onPress={showPasswordHandler(name)} 
                /> 
                ) : ''}
              
              error={!!fieldsError[name] || !fields[name]}
            />
            {!!fieldsError[name] && (
              <HelperText type='error'>{fieldsError[name]}</HelperText> 
            )}
          </View>
        ))}

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={forgotPasswordHandler} >
            <Text style={styles.forgotPasswordText} >Reset password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submitHandler} >
          <Button mode='contained' loading={loading} style={styles.submitButton}>Get Token</Button>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={{ color: theme.palette.text.secondary }}>Or Login with</Text>
          <TouchableOpacity onPress={loginHandler} >
            <Button uppercase={false} color={theme.palette.text.primary} >Login</Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  )
}
export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 32
  },
  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
  forgotPasswordText: {
    color: theme.palette.text.primary,
  },
  submitButton: {
    marginVertical: 16
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 32
  }
})