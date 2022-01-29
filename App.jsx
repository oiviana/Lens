import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import LoginNavigator from './src/routes/LoginNavigator'

export default function App() {
  return (
     <NavigationContainer>
          <LoginNavigator/> 
     </NavigationContainer>
 
    
      )};