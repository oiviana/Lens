import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Notificacoes  from '../../views/Notificacoes';

const Stack = createStackNavigator();

export default function NotificationNavigator() {
    return(

            <Stack.Navigator>
                <Stack.Screen name="Notificações" component={Notificacoes} options={{
                }}/>
            </Stack.Navigator>
   
        
    );
}  