import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Vagas  from '../views/Vagas';
import VagaInfo  from '../views/VagaInfo';

const Stack = createStackNavigator();

export default function VacancyNavigator() {
    return(

            <Stack.Navigator>
                <Stack.Screen name="VacancyNavigator" component={VagaInfo} options={{
                     headerShown: false, 
                }}/>

            </Stack.Navigator>

    );
}