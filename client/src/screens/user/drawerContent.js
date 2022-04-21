import { useSelector } from 'react-redux'
import { BASE_URL } from '@env'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Avatar, Badge, Divider, List, Surface } from 'react-native-paper'

import Layout from '../../layout'
import theme from '../../theme/color'

const listItems = [
  { icon: 'account', title: 'About Me' },
  { icon: 'account-box', title: 'Contact Us' },
  { icon: 'help', title: 'Help' },
]

const DrawerContent = () => {
  const navigation = useNavigation()
  const { user } = useSelector( state => state.user )

  // console.log(user.avatar.secure_url)
  
  const listItemHandler = (title) => () => {
    console.log({ title })
    navigation.navigate(title)
  }

  return (
    <Layout isStack={true}>
      <View style={styles.cover}>

      <View style={styles.profileImageContainer}>
        <Image 
          source={{ uri: `${BASE_URL}/static/images/avatar.png` }} 
          // source={{ uri: `${BASE_URL}/static/images/users/default.jpg` }} 
          // source={{ uri: `${BASE_URL}/${user.avatar?.secure_url}` }} 
          style={styles.profileImage}
        />
      </View>


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
          <TouchableOpacity key={title} onPress={listItemHandler(title)}>
            <List.Item
              title={title}
              left={(props) => <List.Icon {...props} icon={icon} />}
              right={(props) => (
                <Badge visible={!!index} size={24} style={styles.badgeStyle}> {index} </Badge>
              )}
            />
            <Divider style={{ 
              borderBottomWidth: 1,
              borderBottomColor: theme.palette.grey[300]
            }} />
          </TouchableOpacity>
        ))}
      </Surface>
    </Layout>
  )
}
export default DrawerContent

const styles = StyleSheet.create({
  cover: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 32,
    // color: 'white',
  },
  avatar: {
    marginLeft: 8,
  },
  profileImageContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  profileImage: {
    height: 80,
    width: 80,
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