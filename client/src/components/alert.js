
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../theme/color'

const alertItems = [
  { color: '#f0625f', bg: '#fdeded',  name: 'error',    icon: 'alert-circle-outline', },  // => Red
  { color: '#19b0f4', bg: '#e5f6fd',  name: 'info',     icon: 'information-outline', },   // => DodgerBlue
  { color: '#ffa016', bg: '#fff4e5',  name: 'warning',  icon: 'alert-outline', },         // => Orange
  { color: '#5bb65f', bg: '#edf7ed',  name: 'success',  icon: 'check-circle-outline', },  // => Green
]

/*
  <Alert 
    visible={visible}
    title='My alert title goes here'
    mode='success'                   // success | info | warning | error
    // description={description}
    // action={actionHandler}
  />
*/
const Alert = (props) => {
  const { 
    visible=true,
    title='', 
    description='',
    action,
    mode='success',
  } = props

  return (
    <View>
      {alertItems.map(item => item.name === mode && (
        <View key={item.name} style={{
          ...styles.alertContainer,
          display: visible ? 'flex' : 'none',
          alignItems: description ? 'flex-start' : 'center',
          borderColor: `${item.color}55`,
          backgroundColor: item.bg
        }}>
          <MaterialCommunityIcons name={item.icon} color={item.color} size={24} />
          <View style={styles.messageContainer}>
            <Text style={{ 
              ...styles.title,
              color: !!description ? '#000' : '#000a'
            }} numberOfLines={1}>{title}</Text>

            {!!description && (
            <Text style={styles.description} numberOfLines={4}> 
              {description}
            </Text>)}
          </View>

          {action && (
            <TouchableOpacity onPress={action}>
              <MaterialCommunityIcons name='close' color='#00000088' size={24} />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  )
}
export default Alert

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 8 * 2,
    borderWidth: 1,
    // backgroundColor: '#edf7ed',
    // borderColor: '#5bb65f33'
  },
    messageContainer: {
      flex: 1,
      marginHorizontal: 8,
    },
      title: {
        // color: theme.palette.text.primary
      },
      description: {
        marginTop: 8,
        textAlign: 'justify',
        color: theme.palette.text.secondary
      }

})