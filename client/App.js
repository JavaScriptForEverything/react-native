import 'react-native-gesture-handler' 		// Put Top of everything. Else App may crush on production.
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import store from './src/store'
import Main from './src/navigate/bottomNavigation'

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

/* client/.env
	BASE_URL=http://192.168.0.105:5000
*/
