import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import NotificationNavigator from "./NotificationNavigator";
import UserNavigator from "./UserNavigator";
import LoginScreen from "../views/Login";
import VacancyNavigator from "./VacancyNavigator";
import {Entypo, Feather} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function Main(){
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
            component={HomeNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="grid" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="Vagas" 
            component={VacancyNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="briefcase" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="Notificações" 
            component={NotificationNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="bell" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen name="Perfil"
             component={UserNavigator}
             options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="user" size={size} color={color}/>
                )
            }}
            />
        </Tab.Navigator>
    )
}