import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMe } from '../../store/userReducer'

import { StyleSheet, ScrollView, View, Text, Image, Pressable } from 'react-native'
import { ActivityIndicator, Caption, Subheading } from 'react-native-paper'
import { BASE_URL } from '@env'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'

import { developmentTools, mobileTechnologies, webTechnologies } from '../../data/user'
import theme from '../../theme/color'
import Layout from '../../layout'
import SocialMedia from '../../components/socialMedia'
import DevelopmentStack from '../../components/listView'


const technologies = [
  { arrayObject: webTechnologies, title: 'WEB DEVELOPMENT STACK' },
  { arrayObject: mobileTechnologies, title: 'MOBILE APP DEVELOPMENT STACK' },
  { arrayObject: developmentTools, title: 'DEVELOPMENT TOOLS' },
]

const AboutMe = () => {
  const dispatch = useDispatch()

  const [ avatar, setAvatar ] = useState({})
  const { loading, token, user } = useSelector( state => state.user )

  // console.log( user )

  const avatarPressHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      aspectRatio: [4, 3]
    })
    if(result.cancelled) return

    // show image into page immediately
    const image = { 
      name: result.uri.split('/').pop(),
      secure_url: `data:image/jpj;base64,${result.base64}`
    }
    setAvatar(image)

    // Send data to backend
    dispatch(updateMe(token, { avatar: image })) 

    // console.log(image)
  }


  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Pressable onPress={avatarPressHandler}>

              <Image 
                source={{ 
                  uri: `${BASE_URL}/${user.avatar.secure_url}`    // 3. load from database after upload
                    || avatar.secure_url                          // 2. show immediately when try to upload user photo
                    || `${BASE_URL}/static/images/avatar.png`     // 1. default user photo
                }} 
                style={styles.profileImage}
              />

              { loading && <ActivityIndicator 
                size={42}
                color='dodgerblue'
                style={styles.loader} 
              /> }
              <MaterialCommunityIcons style={styles.uploadIcon} name='cloud-upload-outline' size={32} color='dodgerblue'  />
            </Pressable>
          </View>
          <Subheading style={styles.avatarTitle}>{user.name}</Subheading>
          <Caption>Web Developer | App Developer</Caption>
        </View>


        <SocialMedia />

        <Text style={styles.avatarDescription}>
          Hi, I'a <Text>Javascript programmer</Text>, which lead me to create Web application
          and Mobile application for both android and iSO with the help of 'react-native'
        </Text>

        { technologies.map(({ title, arrayObject }) => <DevelopmentStack key={title}
          title={title}
          arrayObject={arrayObject}
        />)}

      </ScrollView>
    </Layout>
  )
}
export default AboutMe

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    // height: 80,
    // width: 80,
    // borderRadius: 40,
    // overflow: 'hidden',
    // // borderWidth: 1,
    // // borderColor: theme.palette.primary.main
  },
    profileImage: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    loader: {
      position: 'absolute',
      right: 20,
      bottom: 20

    },
    uploadIcon: {
      position: 'absolute',
      right: -10,
      bottom: 0
    },
    
  avatarTitle: {
    color: theme.palette.primary.main
  },
  avatarDescription: {
    marginHorizontal: 24, 
    marginVertical: 8, 
    color: theme.palette.text.secondary
  },

})