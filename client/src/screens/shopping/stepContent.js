import { useSelector } from 'react-redux'
import PaymentScreen from './payment'
import PaymentSuccessScreen from './paymentSuccess'
import ShippingInfoScreen from './shippingInfo'
import ShoppingDetailsScreen from './shoppingDetails'


// used into  .src/components/stepper.js
const StepContent = () => {
  const { step } = useSelector(state => state.payment)

  switch (step) {
    case 1: return <ShippingInfoScreen />
    case 2: return <ShoppingDetailsScreen />
    case 3: return <PaymentScreen />
  
    default: return <PaymentSuccessScreen />
  }
}
export default StepContent