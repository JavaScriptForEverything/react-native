import { useState } from 'react'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Button, Caption, Divider, HelperText, List, Subheading, TextInput } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import GoBack from '../../components/goBack'
import { arrayObjectAsObject } from '../../util'

const url = 'http://192.168.0.105:5000/static/images/products/coverPhoto-62501c638ba7bc1b831258ed-908c100b4488.jpeg '

const size = 40
const padding = 8
const borderRadius = (size +  (padding * 4)) / 2

const inputItems = [
  { name: 'name', label: 'Product Name', },
  { name: 'price', label: 'Product Price', type: 'number' },
  { name: 'rating', label: 'Product Rating', type: 'number' },
  { name: 'summary', label: 'Product short summary', line: 4 },
  { name: 'description', label: 'Product Long Description', line: 6 },
  // { name: 'coverPhoto', label: '' },
  // { name: 'images', label: '' },
]
const inputFields = arrayObjectAsObject(inputItems, 'name')

const AddProduct = () => {
  const [ fields, setFields ] = useState({ ...inputFields })
  const [ fieldsError, setFieldsError ] = useState({ ...inputFields })

  const coverImageUploadHandler = () => {
    console.log('upload coverPhoto')
  }
  const multipleImageUploadHandler = () => {
    console.log('images')
  }

  const listDeleteHandler = (id) => () => {
    console.log({ id })
  }
  const textChangeHandler = (name) => (text) => {
    setFields({ ...fields, [name]: text})
  }
  const submitHandler = () => {
    console.log(fields)
  }


  return (
    <View style={styles.container}>
      <GoBack />
      <ScrollView showsVerticalScrollIndicator={false} >
      
        <View>
          <TouchableOpacity style={styles.uploadIcon} onPress={coverImageUploadHandler} >
            <MaterialCommunityIcons name='cloud-upload' size={size} color='black' />
          </TouchableOpacity>
          <Image 
            source={{ uri: url }}
            style={styles.image}
          />
        </View>

        <TouchableOpacity onPress={multipleImageUploadHandler}>
          <View style={styles.imagesContainer}>
              <MaterialCommunityIcons name='cloud-upload' size={size} color='black' />
            <Subheading style={styles.imagesHeading}>Select slide photos </Subheading>
            <Caption>Indivisual file size limit 1MB</Caption>
          </View>
        </TouchableOpacity>

        {[1,2,3].map(item => (
          <View key={item}>
            <List.Item
              title='Image 1.jpg'
              description='542 KB'
              left={props => <Image {...props} source={{ uri: url }} style={styles.image} />}
              right={props => (
                <TouchableOpacity onPress={listDeleteHandler(1)} >
                  <List.Icon {...props} icon='close-circle-outline' />
                </TouchableOpacity>
              )}
            />
            <Divider style={styles.divider} />
          </View>
        ))}


        <View style={styles.formContainer}>
          { inputItems.map(({ name, label, type, line }) => (
            <View key={name}>
              <TextInput
                mode='outlined'
                label={label}
                placeholder={label}
                onChangeText={textChangeHandler(name)}
                onEndEditing={submitHandler}
                keyboardType={type === 'number' ? 'numeric' : 'default'}

                multiline={true}
                numberOfLines={ line ? line : 1}
              
                error={!fields[name] || !!fieldsError[name]}
              />

              {!!fieldsError[name] && <HelperText type='error'>{fieldsError[name]}</HelperText> }
            </View>
          ))}

          <Button
            style={styles.submitButton}
            mode='contained'
            // uppercase={false}
            onPress={submitHandler}
          >Create Post</Button>

        </View>
      </ScrollView>
    </View>
  )
}
export default AddProduct

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1, borderColor: 'dodgerblue',
    flex: 1
  },
  image: {
    backgroundColor: 'dodgerblue',
    aspectRatio: 2,
    resizeMode: 'cover'
  },
  divider: {
    borderBottomWidth: 1, 
    borderBottomColor: '#cccc' 
  },

  uploadIcon: {
    zIndex: 1,
    position: 'absolute',
    top: '43%',
    left: '43%',
    
    padding: padding,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: borderRadius
  },

  imagesContainer: {
    // flex: 1,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'space-around',

    marginHorizontal: 8,
    marginVertical: 8 * 2,
    paddingHorizontal: 8,
    paddingVertical: 8 * 2,

    borderWidth: 2,
    borderColor: '#cccc',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
    imagesHeading: {
      color: 'dodgerblue'
    },

  formContainer: {
    marginTop: 8 * 3,
    paddingHorizontal: 8
  },
    centerIcon: {
      marginTop: 4
    },
    submitButton: {
      marginVertical: 16
    }

})