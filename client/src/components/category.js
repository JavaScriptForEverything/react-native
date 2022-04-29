import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import theme from '../theme/color'

/*
  <Category 
    data={categories}
    style={styles.category}
    onPress={categoryPressHandler}
    border={true}
    containerBorder={true}
    // showIcon={true}
    // iconColor='dodgerblue'
  />
*/
const Category = (props) => {

  const {
    data=[],          // [{ label: 'shirt', icon: 'shirtIcon' }, {..}, ...]
    onPress=f=>f,
    style={},
    containerBorder=false,
    border=false,

    showIcon=false,
    iconColor=theme.palette.grey[700]
  } = props

  return (
    <View style={style}>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={{ 
          ...styles.categoryContainer, 
          borderWidth: containerBorder ? 1 : 0
        }}
      >
        {data.map(({ label, icon }) => (
          <Surface key={label} style={{ 
            ...styles.categorySurface,
            borderWidth: border ? 1 : 0,
            borderRadius: showIcon ? 0 : 8 * 3,
          }}>
            <TouchableOpacity onPress={() => onPress(label)}>
              <View style={styles.category}>
                {showIcon && <MaterialCommunityIcons 
                  name={icon} 
                  size={24} 
                  color={iconColor} 
                  style={{ marginVertical: 4 }}
                /> }
                <Text>{label}</Text>
              </View>
            </TouchableOpacity>
          </Surface>
        ))}
      </ScrollView>
    </View>
  )
}
export default Category

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
      // borderWidth: border ? 1 : 0,
      borderColor: theme.palette.grey[300],
      paddingVertical: 4
  },
    categorySurface: {
      margin: 4,
      backgroundColor: theme.palette.grey[200],
      // borderWidth: 1,
      // borderRadius: 8 * 3,
      borderColor: theme.palette.grey[400],
    },
      category: {
        paddingVertical: 4,
        paddingHorizontal: 8 * 2,
        alignItems: 'center'
      }
})