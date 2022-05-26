import React from "react";
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../views/Perfil';
import EditaPerfil from "../../views/EditaPerfil";
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function UserNavigator({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Perfil" component={Perfil} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Editar Perfil')}>
                        <Feather name='edit-2' size={25} color={'#000'} style={{paddingRight:8}} />
                    </TouchableOpacity>
                ),

            }} />
            <Stack.Screen name="Editar Perfil" component={EditaPerfil} options={{
            }} />
        </Stack.Navigator>

    );
}
// { formats.map( (format) => <Text text="Hello World" format={format}/>) } 