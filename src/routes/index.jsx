import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import Main from './student/Main';

const Stack = createStackNavigator();

export default function Routes() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{
                headerShown: false
            }} />
            <Stack.Screen name="LoginScreen" component={LoginNavigator} options={{
                headerShown: false
            }} />
        </Stack.Navigator>


    );
}