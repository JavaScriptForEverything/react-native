import { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { List, Menu } from 'react-native-paper'

// used in: src/screens/shopping/shoppingDetails.js
const ListIconMenu = ({ menuItems, product, ...props }) => {
  const [ visible, setVisible ] = useState(false)

  const iconPressHandler = () => setVisible(true)
  const closeHandler = () => setVisible(false)
  const itemHandler = (handler) => () => {
    closeHandler()
    handler(product)
    // console.log(product)
  }

  return (
    <View>
      <Menu
        anchor={ 
          <TouchableOpacity onPress={iconPressHandler}>
            <List.Icon {...props} icon='dots-vertical' />
          </TouchableOpacity>
        }
        visible={visible}
        onDismiss={closeHandler}
      >
        {menuItems.map(({title, icon, handler=f=>f}, index, arr) => (
          <Menu.Item key={title}
            title={title}
            icon={icon}
            onPress={itemHandler(handler)}
            style={{
              borderBottomWidth: arr.length-1 === index ? 0 : 1,
              borderBottomColor: '#0002',
            }}
          />
        ))}
      </Menu>
    </View>
  )
}
export default ListIconMenu

const styles = StyleSheet.create({
  menuItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#0002',
  }
})