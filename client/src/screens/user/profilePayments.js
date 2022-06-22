import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPayments } from '../../store/userReducer'

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { token, user } = useSelector( state => state.user )

  // console.log(user._id)
  // console.log(user.payments.length)
  // console.log(user.products.length)

  useEffect(() => {
    user._id && token && dispatch(getUserPayments(token, user._id))                 // userId
    // user._id && dispatch(getUserPayments(token, user._id))                 // userId
  }, [user._id, token])

  const itemHandler = (paymentId) => () => {
    navigation.navigate('User Payments Details', { paymentId })   
    // console.log({ payment: paymentId })
  }
  const deleteHandler = (paymentId) => () => {
    console.log('delete: ', paymentId)
  }

  return (
    <View>
      { user.payments && user.payments.map(payment => (
        <TouchableOpacity key={payment._id} onPress={itemHandler(payment._id)}>
          <List.Item 
            title={payment._id}
            // description='$20.00 | ****** | 43 (reviews)'
            description={`$${payment.amount.toFixed(2)} | ${new Date(payment.createdAt).toDateString('en_us', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })} `}
            left={props => <Image 
              source={require('../../../assets/favicon.png')}
              style={{ width: 50, height: 50 }}
            /> }
            right={props => (
              <TouchableOpacity onPress={deleteHandler(payment._id)}>
                <List.Icon { ...props } icon='delete-outline' />
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}
export default ProfileScreen

const styles = StyleSheet.create({

})