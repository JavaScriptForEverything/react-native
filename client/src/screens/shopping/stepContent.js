import PaymentScreen from './payment'
import PaymentSuccessScreen from './paymentSuccess'
import ShippingInfoScreen from './shippingInfo'
import ShoppingDetailsScreen from './shoppingDetails'


const StepContent = (props) => {
  const { step } = props

  switch (step) {
    case 1: return <ShippingInfoScreen {...props} />
    case 2: return <ShoppingDetailsScreen {...props} />
    case 3: return <PaymentScreen {...props} />
  
    default: return <PaymentSuccessScreen {...props} />
  }
}
export default StepContent