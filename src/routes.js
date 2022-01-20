import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './views/Home';
import Notificacoes from './views/Notificacoes';
import Perfil from './views/Perfil';
import Vagas from './views/Vagas';

import {Entypo, Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{
                height: 55,
                backgroundColor: '#EDEEF8',
                paddingBottom:5,
                paddingTop:5,    
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#616163',
        }}

        >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="grid" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="Vagas" 
            component={Vagas}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="briefcase" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="Notificações" 
            component={Notificacoes}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="bell" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen name="Perfil"
             component={Perfil}
             options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="user" size={size} color={color}/>
                )
            }}
            />
        </Tab.Navigator>
    )
}