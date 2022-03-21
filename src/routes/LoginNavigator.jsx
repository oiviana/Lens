import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/Login';
import Cadastro from '../views/Cadastro'
import Main from '../routes/student/Main';

const Stack = createStackNavigator();

export default function LoginNavigator() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>



    );
}