import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { List, RadioButton, Title } from 'react-native-paper'

import theme from '../../theme/color'
import PaymentByBcash from './payment/paymentByBcash'
import PaymentByCard from './payment/paymentByCard'
import PaymentByCash from './payment/paymentByCash'

const paymentMethods = [ 
  { name: 'Card',   label: 'Card Payment', Component: PaymentByCard },
  { name: 'bCash',  label: 'Bcash Mobile', Component: PaymentByBcash },
  { name: 'Cash',   label: 'Cash on Delivery', Component: PaymentByCash }, 
]


// used into  .src/screens/shopping/StepContent.js
const PaymentScreen = () => {
  const [ extended, setExtended ] = useState(false)
  const [ paymentType, setPaymentType ] = useState('Card')

  const paymentAccordionHandler = (newExtended) => setExtended(newExtended)
  const changeHandler = (value) => setPaymentType(value)

  return (
    <View>
      <Title style={styles.title}>Payment Details</Title>

      <List.Accordion
        expanded={extended}
        onPress={paymentAccordionHandler}
        title='Choose Payment Methods'
        description='By Cart, Bcash or Cash on Delievery'
      >
        <RadioButton.Group onValueChange={changeHandler} value={paymentType} >
          {paymentMethods.map(({name, label}) => (
            <RadioButton.Item key={name}
              label={label}
              color='dodgerblue'
              value={name}
              status={ paymentType === name ? 'checked' : 'unchecked' }
            />
          ))}
        </RadioButton.Group>
      </List.Accordion>

      <View style={styles.paymentContainer}>
        {paymentMethods.map(({ name, Component }) => name === paymentType && (
          <Component key={name}/>
        ))}
      </View>
    
    </View>
  )
}
export default PaymentScreen

const styles = StyleSheet.create({
  title: {
    marginBottom: 8 * 3,
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  paymentType: {
    color: theme.palette.primary.main,
    marginBottom: 8 * 3,
  },
  paymentContainer: {
    marginVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#0003',
    paddingVertical: 8 * 2
  }
})
