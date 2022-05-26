import React from "react";
import { TouchableOpacity,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyPerfil from '../../views/CompanyPerfil';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function CompanyVacancyNavigator({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Seu Perfil" component={CompanyPerfil} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Editar Perfil')}>
                        <Feather name='edit-2' size={25} color={'#000'} style={{ paddingRight: 8 }} />
                    </TouchableOpacity>
                ),
            }} />
        </Stack.Navigator>


    );
}