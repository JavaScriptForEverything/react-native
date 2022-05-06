import { StyleSheet, View, Text } from 'react-native'

import ShippingInfoScreen from './shippingInfo'
import DetailsScreen from './shoppingDetails'
import PaymentScreen from './payment'

const StepContent = ({ step= 1 }) => {
  switch(step) {
    case 1: return <ShippingInfoScreen /> 
    case 2: return <DetailsScreen /> 
    case 3: return <PaymentScreen /> 

    default: <></>
  }
}
export default StepContent

const styles = StyleSheet.create({

})