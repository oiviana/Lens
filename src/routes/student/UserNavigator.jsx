import React from "react";
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../views/Perfil';

const Stack = createStackNavigator();

export default function UserNavigator({navigation}) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={Perfil} options={{
                headerRight: () => (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                        icon
                    />
                ),

            }} />
        </Stack.Navigator>

    );
}