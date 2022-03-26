import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import Main from './student/Main';
import { useAuth } from "../hooks/useAuth";

const Stack = createStackNavigator();

export default function Routes() {
    const {userData} = useAuth()
    if(userData){
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
    
    
        );
        
    }
    return(
        <LoginNavigator/>
    )

}