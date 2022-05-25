import { useEffect, useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, Image, View, ScrollView, RefreshControl, FlatList } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import Layout from '../../layout'

const items = [...new Array(4)].map((_, index) => ({
	key: index,
	name: `Item ${index + 1}`
}))

const SettingScreen = () => {
	const [ open, setOpen ] = useState(false)

	const pressHandler = () => {
		setOpen(true)
	}
	const closeHandler = () => {
		setOpen(false)
	}
	const closeButtonHandler = () => {
		closeHandler()	
		console.log('close handler')
	}
	const okButtonHandler = () => {
		closeHandler()	
		console.log('Ok handler')
	}



	return (
		<Layout>
			<Text>Admin</Text>

			<Button onPress={pressHandler}>Show Modal</Button>

			<Modal
				visible={open}
				onRequestClose={closeHandler}
				// transparent
				animationType='fade' 				// fade | slide | none (default)
				hardwareAccelerated 				// increase performance little bit
			>
				<View style={styles.modalWrapper} >
					<View style={styles.modalContainer} >

						<View style={styles.titleContainer}>
							<Text>Title</Text>
						</View>

						<View style={styles.bodyContainer}>
							<Text>Body</Text>
						</View>

						<View style={styles.footerContainer}>
							<Button mode='outlined' onPress={closeButtonHandler} style={styles.closeButton}>Close</Button>
							<Button mode='outlined' onPress={okButtonHandler}>Ok</Button>
						</View>
					</View>
				</View>
			</Modal>


		</Layout>
	)
}
export default SettingScreen

const styles = StyleSheet.create({
	modalWrapper: {
		// borderWidth: 1, borderColor: 'red',
		flex: 1, 																// full column
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#cccccc'
	},
		modalContainer: {
			// borderWidth: 1, borderColor: 'dodgerblue',
			// flex: 1,
			width: '80%', height: '40%',
			// justifyContent: 'space-between',
			backgroundColor: '#ffffff',
			padding: 8,
		},
			titleContainer: {
				flex: .3, 								// 1/3 	: 
				// borderWidth: 1, borderColor: 'dodgerblue',
			},
			bodyContainer: {
				flex: 1, 								// take full => push last item to bottom
				// borderWidth: 1, borderColor: 'dodgerblue',
			},
			footerContainer: {
				// borderWidth: 1, borderColor: 'dodgerblue',
				flexDirection: 'row',
				justifyContent: 'flex-end',
				marginTop: 8
			},
			closeButton: {
				marginRight: 8
			}
})