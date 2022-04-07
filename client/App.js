import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import Main from './src/navigate/bottomNavigation'
import store from './src/store'


const App = () => {
	return (
		<ReduxProvider store={store}>
			<PaperProvider>
				<NavigationContainer>
					<Main />
				</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	)
}
export default App
