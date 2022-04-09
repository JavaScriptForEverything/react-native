import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/productReducer'

const SearchBarComponent = () => {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState('')

  const { products }  = useSelector(state => state.product)

  const searchHandler = (text) => {
    setValue(text)
  }

  const submitHandler = () => {
    dispatch(getProducts({ search: value }))
  }

  return (
    <Searchbar 
      placeholder='Search product by name'
      value={value}
      onChangeText={searchHandler}
      onEndEditing={submitHandler}
    />
  )
}
export default SearchBarComponent

const styles = StyleSheet.create({

})