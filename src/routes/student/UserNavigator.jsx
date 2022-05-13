import React from "react";
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../views/Perfil';
import EditaPerfil from "../../views/EditaPerfil";

const Stack = createStackNavigator();

export default function UserNavigator({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={Perfil} options={{
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Editar Perfil')}
                        title="Editar"
                        color="#000"
                        icon
                    />
                ),

            }} />
            <Stack.Screen name="Editar Perfil" component={EditaPerfil} options={{
            }} />
        </Stack.Navigator>

    );
}
// { formats.map( (format) => <Text text="Hello World" format={format}/>) } 