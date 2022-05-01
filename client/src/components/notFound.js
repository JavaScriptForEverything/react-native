import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../theme/color'

const NotFound = ({ noResultFor='' }) => {
  return (
    <View style={styles.container}>
      <Text>No result for {noResultFor}</Text>
      <MaterialCommunityIcons name='magnify' color='#aaaaaaaa' size={150} />

      <View style={styles.messageContainer}>
        <Text style={styles.warning}> We didn't find anything for {`"${noResultFor}"`} </Text>
        <Text style={styles.info}> 
          Please double check the spelling, try a more generic search term, or try other search term.  
        </Text>
      </View>
    </View>
  )
}
export default NotFound

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    alignItems: 'flex-start',
    padding: 24
  },
    warning: {
      fontWeight: '100',
      marginBottom: 8
    },
    info: {
      color: theme.palette.text.secondary
    }
})
