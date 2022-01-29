import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home  from '../views/Home';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    return(
       
            <Stack.Navigator>
                <Stack.Screen name="Homestack" component={Home} options={{
                     headerShown: false, 
                }}/>
            </Stack.Navigator>
  
        
    );
}