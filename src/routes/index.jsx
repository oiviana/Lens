import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import Main from './Main';

const Stack = createStackNavigator();

export default function Routes() {
    return(
    
            <Stack.Navigator>
                  <Stack.Screen name="LoginScreen" component={LoginNavigator} options={{
                       headerShown: false
                }}/>
                
                  <Stack.Screen name="Main" component={Main} options={{
                       headerShown: false
                }}/>
                
            </Stack.Navigator>
  
        
    );
}