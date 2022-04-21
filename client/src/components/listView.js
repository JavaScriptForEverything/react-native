import { StyleSheet, View } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'

import theme from '../theme/color'

/* used in  /screens/user/AboutMe.js
      { technologies.map(({ title, arrayObject }) => <DevelopmentStack key={title}
        title={title}
        arrayObject={arrayObject}
      />)}
*/
const DevelopmentStack = ({ title='', arrayObject=[] }) => {
  return (
    <View>
      <Divider style={styles.listSeperator}/>
      <List.Section style={[styles.avatarDescription]}>
        <Text>{title}</Text>
        {arrayObject.map(({ title, description }) => <List.Item key={title}
          title={title}
          description={description}
        />)}
      </List.Section>
    </View>
  )
}
export default DevelopmentStack

const styles = StyleSheet.create({
  listSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[300],
    marginVertical: 8
  },

  avatarDescription: {
    marginHorizontal: 24, 
    marginVertical: 8, 
    color: theme.palette.text.secondary
  },
})