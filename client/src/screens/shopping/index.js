import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Stepper from '../../components/stepper'

import Layout from '../../layout'

const ShoppingScreen = ( props) => {


	return (
		<Layout>
			<View style={styles.container}>
				<Stepper />
			</View>
		</Layout>
	)
}
export default ShoppingScreen

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
	},
})