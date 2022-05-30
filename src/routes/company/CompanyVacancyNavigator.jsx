import React from "react";
import { TouchableOpacity,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyVagas from '../../views/CompanyVagas';
import CompanyEditVaga from '../../views/CompanyEditVaga';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function CompanyVacancyNavigator({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Suas Vagas" component={CompanyVagas} />
            <Stack.Screen name="Editar Vaga" component={CompanyEditVaga} />
        </Stack.Navigator>


    );
}