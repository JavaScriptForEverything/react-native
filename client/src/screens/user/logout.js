import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logoutMe } from '../../store/userReducer'

import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

const Logout = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    dispatch(logoutMe())
    navigation.navigate('Login')
  }

  return (
    <View>
      <Button 
        mode='outlined'
        onPress={logoutHandler}
        uppercase={false}
        style={styles.logout}
      >Logout</Button>
    </View>
  )
}
export default Logout

const styles = StyleSheet.create({
  logout: {
    marginRight: 8
  }
})