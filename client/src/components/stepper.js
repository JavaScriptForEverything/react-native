import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Avatar, Button, Divider, Text } from 'react-native-paper'
import StepContent from '../screens/shopping/stepContent'
import theme from '../theme/color'

const stepItems = [
  { label: 'Info' },
  { label: 'Details' },
  { label: 'Payment' }
]
const Stepper = () => {
  const [ step, setStep ] = useState(1)

	const nextHandler = () => {
		if(step > 3) return 
		setStep(step+1)
	}
	const prevHandler = () => {
		if(step <= 1) return
		setStep(step-1)
	}

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
          <StepContent 
            step={step} 
            prevHandler={prevHandler}
            nextHandler={nextHandler}
          />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          disabled={step <= 1}
          mode='outlined' 
          uppercase={false} 
          onPress={prevHandler} 
        >Prev</Button>

        <Button 
          disabled={step > 3} 
          mode='outlined' 
          uppercase={false} 
          onPress={nextHandler} 
          style={styles.btnItem}
        >{ step >= 3 
          ? (step > 3 ? 'Paid' : 'Pay') 
          : 'Next'
        }</Button>
      </View>
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
    marginVertical: 16,
  },

	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginVertical: 16
	},
		btnItem: {
			marginLeft: 8
		}
})