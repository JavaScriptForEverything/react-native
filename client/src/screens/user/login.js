import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { arrayObjectAsObject, formValidator } from '../../util'
import { logOnTo, modifyToken } from '../../store/userReducer'
import localStorage from '@react-native-async-storage/async-storage'

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput, Title } from 'react-native-paper'
import Layout from '../../layout'
import theme from '../../theme/color'

const inputItems = [
  { label: 'Email Address', name: 'email',  icon: 'email' },
  { label: 'Password', name: 'password', icon: 'lock', type: 'password'},
]
const inputItemsAsObject = arrayObjectAsObject(inputItems, 'name')


const LoginScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { error, loading, token, authenticated, user } = useSelector(state => state.user)

  const [ showPassword, setShowPassword ] = useState(false)
  const [ fields, setFields ] = useState({ ...inputItemsAsObject })
  const [ fieldsError, setFieldsError ] = useState({ ...inputItemsAsObject })

  // console.log({ token })

  const protecte = async () => {
    const oldToken = await localStorage.getItem('token')
    oldToken && dispatch( modifyToken(oldToken) )
  }
  useEffect(() => {
    protecte()
  }, [])

  useEffect(() => {
    if(error) console.log(error)
  }, [error, authenticated, user])

  useEffect(() => {
    if(token) return navigation.navigate('Profile')
    navigation.navigate('Login')
  }, [token])


  const signupHandler = () => navigation.navigate('Signup')
  const forgotPasswordHandler = () => navigation.navigate('Forgot Password')
  
  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  const changeHandler = (name) => (value) => {
    setFields({ ...fields, [name]: value })
  }
  const submitHandler = () => {
    if( !formValidator(fields, setFieldsError)) return
    dispatch(logOnTo(fields))
    // console.log(fields)
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Title style={styles.title}>Login</Title>
        {inputItems.map(({ name, label, icon, type }) => (
          <View key={name}>
            <TextInput
              label={label}
              placeholder={label}
              value={fields[name]}
              secureTextEntry={type === 'password' && !showPassword}
              onChangeText={changeHandler(name)}
              onEndEditing={submitHandler}
              left={<TextInput.Icon name={icon} color='grey' />}
              right={ type === 'password' ? (
                <TextInput.Icon 
                  name={showPassword ? 'eye-off' : 'eye'}
                  onPress={showPasswordHandler} 
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
            <Text style={styles.forgotPasswordText} >Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submitHandler} >
          <Button mode='contained' loading={loading} style={styles.submitButton}>Login</Button>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={{ color: theme.palette.text.secondary }}>Or Signup with</Text>
          <TouchableOpacity onPress={signupHandler} >
            <Button uppercase={false} color={theme.palette.text.primary} >Signup</Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  )
}
export default LoginScreen

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