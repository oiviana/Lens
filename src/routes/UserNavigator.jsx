import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Perfil  from '../views/Perfil';

const Stack = createStackNavigator();

export default function UserNavigator() {
    return(
    
            <Stack.Navigator>
                <Stack.Screen name="UserNavigator" component={Perfil} options={{
                     headerShown: false, 
                }}/>
            </Stack.Navigator>
 
    );
}