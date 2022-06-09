import React from "react";
import { TouchableOpacity,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyVagas from '../../views/CompanyVagas';
import CompanyEditVaga from '../../views/CompanyEditVaga';
import CompanyCandidates from '../../views/CompanyCandidates';
import CompanyStudent from '../../views/CompanyStudent';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function CompanyVacancyNavigator({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Suas Vagas" component={CompanyVagas} />
            <Stack.Screen name="Editar Vaga" component={CompanyEditVaga} />
            <Stack.Screen name="Candidatos" component={CompanyCandidates} />
            <Stack.Screen name="Candidato" component={CompanyStudent} />
        </Stack.Navigator>


    );
}