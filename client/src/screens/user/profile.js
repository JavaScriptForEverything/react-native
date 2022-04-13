import { useSelector } from 'react-redux'
import { BASE_URL } from '@env'
import { useNavigation } from '@react-navigation/native'
import { useDrawerStatus } from '@react-navigation/drawer'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Avatar, Badge, Button, Divider, List, Surface, Title } from 'react-native-paper'

import Layout from '../../layout'
import theme from '../../theme/color'

const listItems = [
  { icon: 'account', title: 'New Group' },
  { icon: 'account-box', title: 'Contact' },
  { icon: 'phone', title: 'Calls' },
]

const ProfileScreen = () => {
  const navigation = useNavigation()
  const isOpen = useDrawerStatus()
  const { user } = useSelector( state => state.user )

  // console.log(isOpen)
  // console.log(user.avatar.secure_url)
  
  const listItemHandler = (index) => () => {
    console.log({ index })
  }

  return (
    <Layout isStack={true}>
      <View style={styles.cover}>
        <Avatar.Image 
          source={{ uri: `${BASE_URL}/${user.avatar?.secure_url}` }} 
          size={84}
        />

        <List.Accordion
          title='riajul islam'
          description='01957500605'
          style={styles.cover}
          titleStyle={styles.username}
          descriptionStyle={styles.phone}
        >
          <List.Item 
            title='riajul islam'
            description='01957500605'
            style={styles.accordionChild}
          />
        </List.Accordion>
      </View>


      <Surface>
        {listItems.map(({ title, icon }, index) => (
          <TouchableOpacity key={title} onPress={listItemHandler(index)}>
            <List.Item
              title={title}
              left={(props) => <List.Icon {...props} icon={icon} />}
              right={(props) => (
                <Badge visible={!!index} size={24} style={styles.badgeStyle}> {index} </Badge>
              )}
            />
          </TouchableOpacity>
        ))}
      </Surface>
    </Layout>
  )
}
export default ProfileScreen

const styles = StyleSheet.create({
  cover: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 16,
    // color: 'white',
  },
  username: {
    textTransform: 'capitalize',
    color: 'white'
  },
  phone: {
    color: 'rgba(255, 255, 255, .7)'
  },
  accordionChild: {
    backgroundColor: 'white'
  },
  badgeStyle: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }
})