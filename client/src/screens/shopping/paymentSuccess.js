import { useState } from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Alert from '../../components/alert'

const PaymentSuccessScreen = ({ step }) => {
  const [ visible, setVisible ] = useState(true)
  // console.log({ step })

  const description = ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. A dolorem asperiores perspiciatis minus maiores error veritatis aperiam ullam vero deserunt consequatur eaque voluptatum, reiciendis tenetur sunt, repellat natus eius expedita!'

  const actionHandler = () => {
    setVisible(false)
  }
  const toggleHandler = () => {
    setVisible(!visible)
  }

  return (
    <View>
      {/* <Text>Success Screen</Text> */}
      {/* <Button onPress={toggleHandler}>Toggle Alert</Button> */}

      <Alert 
        visible={visible}
        title='Your payment is successful'
        mode='success'                   // success | info | warning | error
        // description={description}
        // action={actionHandler}
      />

    </View>
  )
}
export default PaymentSuccessScreen

const styles = StyleSheet.create({

})