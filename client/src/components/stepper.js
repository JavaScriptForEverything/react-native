import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextClicked } from '../store/paymentReducer'

import { StyleSheet, View, ScrollView } from 'react-native'
import { Avatar, Button, Divider, Text } from 'react-native-paper'
import theme from '../theme/color'
import StepContent from '../screens/shopping/stepContent'
import StepperButton from './stepperButtons'

const stepItems = [
  { label: 'Info' },
  { label: 'Details' },
  { label: 'Payment' }
]


const Stepper = () => {
  // const dispatch = useDispatch()
  const [ step, setStep ] = useState(1)
  // const { isScreen } = useSelector(state => state.payment)

  // console.log({ isScreen })



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapperContainer}>
      <View style={styles.container}>
        {stepItems.map(({ label }, index) => (
          <View style={styles.item} key={label}>
            <Avatar.Text label={index + 1} size={24} style={{ 
              ...styles.badge,
              backgroundColor: index + 1 <= step ? '#1976d2' : 'grey',
            }}/>
            <Text>{label}</Text>
            <Divider style={styles.divider} />
          </View>
        ))}
      </View>

      <View style={styles.children}>
        <StepContent step={step} />
      </View>

      {/* <StepperButton 
        step={step}
        setStep={setStep}
      /> */}
    </ScrollView>
  )
}
export default Stepper

const styles = StyleSheet.create({
  divider: {
    width: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaa',
    marginHorizontal: 8,
  },
  wrapperContainer: {
    marginVertical: 8*3
  },
  container: {
    // borderWidth: 1, borderColor: 'dodgerblue',
    flexDirection: 'row',
    alignItems: 'center'
  },
    item: {
      // borderWidth: 1, borderColor: 'dodgerblue',
      flex: 1/3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
      badge: {
        backgroundColor: theme.palette.primary.dark,
        // backgroundColor: 1 ? '#1976d2' : 'grey',
        marginRight: 10
      },
  
  children: {
    // borderWidth: 1, borderColor: 'dodgerblue',
    marginVertical: 8 * 3,
  },

})