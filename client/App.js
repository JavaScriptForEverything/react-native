import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Main from './src/navigate'

const App = () => {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Main />
			</NavigationContainer>
		</PaperProvider>
	)
}
export default App
