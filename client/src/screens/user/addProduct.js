import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../store/userReducer'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Button, Caption, Divider, HelperText, List, Subheading, TextInput } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { nanoid } from '@reduxjs/toolkit'

import GoBack from '../../components/goBack'
import { arrayObjectAsObject, formValidator, humanReadableFileSize } from '../../util'

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
  const dispatch = useDispatch()
  const [ fields, setFields ] = useState({ 
    ...inputFields,
    coverPhoto: 'no image',
    images: []              // [{ name, secure_url, public_id, size }, ...]
  })
  const [ fieldsError, setFieldsError ] = useState({ 
    ...inputFields,
    coverPhoto: '',
    images: []
  })

  const { token, message, loading } = useSelector(state => state.user)

  useEffect(() => {
    if(message) alert(message)
  }, [message])

  const coverImageUploadHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsEditing: true,
      aspectRatio: [4, 3]
    })
    
    const coverPhoto = `data:image/jpg;base64,${result.base64}`
    if(result.cancelled) return

    setFields({ ...fields, coverPhoto })
  }
  const multipleImageUploadHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsEditing: true,
      aspectRatio: [4, 3],
    })

    if(result.cancelled) return

    const File = await FileSystem.getInfoAsync(result.uri)
    const size = humanReadableFileSize(File.size)
    const public_id = nanoid()

    const image = { 
      name: result.uri.split('/').pop(),
      public_id, 
      secure_url: `data:image/jpg;base64,${result.base64}`,
      size, 
    }

    setFields({ ...fields, images: [...fields.images, image] })
    // console.log( imageObject )
  }

  const listDeleteHandler = (public_id) => () => {
    const images = fields.images.filter(image => image.public_id !== public_id )
    setFields({ ...fields, images: [...images] })
    // console.log({ public_id })
  }
  const textChangeHandler = (name) => (text) => setFields({ ...fields, [name]: text})
  
  const submitHandler = () => {
    if( !formValidator(fields, setFieldsError) ) return

    fields.images.length = 3        // more than 3 images will be suppersed

    dispatch(createProduct(token, fields))

    // fields.images = []
    // fields.coverPhoto = undefined
    // console.log(fields)
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
            source={{ uri: fields.coverPhoto }}
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

        {fields.images.map( (image, index) => (
          <View key={image.public_id}>
            <List.Item
              title='Image 1.jpg'
              description={image.size}
              left={props => <Image {...props} source={{ uri: image.secure_url }} style={styles.image} />}
              right={props => (
                <TouchableOpacity onPress={listDeleteHandler(image.public_id)} >
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
            onPress={submitHandler}
            loading={loading}
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