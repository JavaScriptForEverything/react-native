import { StyleSheet, View, Text } from 'react-native'

import ShippingInfoScreen from './shippingInfo'
import DetailsScreen from './shoppingDetails'
import PaymentScreen from './payment'
import PaymentSuccessScreen from './paymentSuccess'

const StepContent = ({ step }) => {
  switch(step) {
    case 1: return <ShippingInfoScreen step={1} /> 
    case 2: return <DetailsScreen step={2} /> 
    case 3: return <PaymentScreen step={3} /> 

    default: return <PaymentSuccessScreen step={4} />
  }
}
export default StepContent

const styles = StyleSheet.create({

})