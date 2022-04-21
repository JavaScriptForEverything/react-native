import { StyleSheet, View, Text, Image, Linking } from 'react-native'
import { Caption, Subheading } from 'react-native-paper'
import { BASE_URL } from '@env'

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

  return (
    <Layout>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: `${BASE_URL}/static/images/avatar.png` }} 
            style={styles.profileImage}
          />
        </View>
        <Subheading style={styles.avatarTitle}>Riajul Islam</Subheading>
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
    </Layout>
  )
}
export default AboutMe

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: theme.palette.primary.main
  },
  profileImage: {
    height: 80,
    width: 80,
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