import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { nextClicked } from '../store/paymentReducer'

const StepperButton = ({ disabled=false, onPress=f=>f }) => {
  const dispatch = useDispatch()
  const { step } = useSelector(state => state.payment)

	const nextHandler = () => {
		if(step > 3) return 
    onPress()
	}
	const prevHandler = () => {
		if(step <= 1) return
    dispatch(nextClicked(step - 1))
	}

  return (
      <View style={styles.buttonContainer}>
        <Button 
          disabled={step <= 1 }  // for tesing
          // disabled={step <= 1 || step > 3}  // if step = 1 or payment success
          mode='outlined' 
          uppercase={false} 
          onPress={prevHandler} 
        >Prev</Button>

        <Button 
          disabled={step > 3 || disabled} 
          mode='outlined' 
          uppercase={false} 
          onPress={nextHandler} 
          style={styles.btnItem}
        >{ step >= 3 
          ? (step > 3 ? 'Paid' : 'Pay') 
          : 'Next'
        }</Button>
      </View>
  )
}
export default StepperButton

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginVertical: 16
	},
		btnItem: {
			marginLeft: 8
		}
})