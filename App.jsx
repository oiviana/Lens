import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import LoginNavigator from './src/routes/LoginNavigator';
import Main from './src/routes/Main';

export default function App() {
  return (
     <NavigationContainer>
          <Routes/> 
     </NavigationContainer>
 
    
      )};