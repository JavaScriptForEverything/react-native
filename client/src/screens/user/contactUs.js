import { StyleSheet, View } from 'react-native'
import { Caption, Headline } from 'react-native-paper'

import Layout from '../../layout'
import SocialMedia from '../../components/socialMedia'
import DevelopmentStack from '../../components/listView'

const contactItems = [
  { title: 'Mobile', description: '+8801957500605' },
  { title: 'Email', description: 'JavascriptForEverything@gmail.com' },
  { title: 'WhatsApp', description: '+8801957500605' },
]

const ContactUp = () => {

  return (
    <Layout>
      <View style={styles.headerArea}>
        <Headline>Contact US</Headline>
        <Caption>Anyone can contact us via bellow ways</Caption>
      </View>

      <DevelopmentStack arrayObject={contactItems} title='Contact US' />
      <SocialMedia />
    </Layout>
  )
}
export default ContactUp

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16
  }
})