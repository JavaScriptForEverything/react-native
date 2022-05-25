import { useState } from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Alert from '../../components/alert'
import StepperButton from '../../components/stepperButtons.js'


// used into  .src/screens/shopping/StepContent.js
const PaymentSuccessScreen = () => {
  
  const { step } = useSelector(state => state.payment)
  const [ visible, setVisible ] = useState(true)

  const description = ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. A dolorem asperiores perspiciatis minus maiores error veritatis aperiam ullam vero deserunt consequatur eaque voluptatum, reiciendis tenetur sunt, repellat natus eius expedita!'

  const actionHandler = () => {
    setVisible(false)
  }
  const toggleHandler = () => {
    setVisible(!visible)
  }

  const submitHandler = () => {
    console.log('Payment Success Handler')
    dispatch(nextClicked(step + 1))
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

      <StepperButton onPress={submitHandler} />
    </View>
  )
}
export default PaymentSuccessScreen

const styles = StyleSheet.create({

})