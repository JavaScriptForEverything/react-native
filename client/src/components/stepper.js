import { useSelector } from 'react-redux'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Avatar, Divider, Text } from 'react-native-paper'

import theme from '../theme/color'
import StepContent from '../screens/shopping/stepContent'

const stepItems = [
  { label: 'Info' },
  { label: 'Details' },
  { label: 'Payment' }
]


const Stepper = () => {
  const { step } = useSelector(state => state.payment)

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapperContainer}>
      <View style={styles.container}>
        {stepItems.map(({ label }, index, arr) => (
          <View style={styles.item} key={label}>
            <Avatar.Text label={index + 1} size={24} style={{ 
              ...styles.badge,
              backgroundColor: index + 1 <= step ? '#1976d2' : 'grey',
            }}/>
            <Text>{label}</Text>
            {arr.length - 1 !== index && <Divider style={styles.divider} /> }
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
    width: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaa',
    marginHorizontal: 8,
  },
  wrapperContainer: {
    // borderWidth: 1, borderColor: 'red',
    marginVertical: 8*3
  },
  container: {
    // borderWidth: 1, borderColor: 'dodgerblue',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
    item: {
      // borderWidth: 1, borderColor: 'dodgerblue',
      flex: 1/3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8
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