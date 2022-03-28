import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import Main from './student/Main';
import CompanyMain from './company/CompanyMain';
import { useAuth } from "../hooks/useAuth";

const Stack = createStackNavigator();

export default function Routes() {
    const { userData, company } = useAuth()
    if (userData && company) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="CompanyMain" component={CompanyMain} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        );
    } else if (userData) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        );

    }

    else {
        return (
            <LoginNavigator />
        )

    }

}