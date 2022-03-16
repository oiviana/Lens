import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import NotificationNavigator from "./NotificationNavigator";
import UserNavigator from "./UserNavigator";
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
            tabBarLabel:() => {return null},
            headerShown:false
        }}

        >
            <Tab.Screen 
            name="HomeTab" 
            component={HomeNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="grid" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="VacancyTab" 
            component={VacancyNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="briefcase" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen 
            name="NotifTab" 
            component={NotificationNavigator}
            options={{
                tabBarIcon:({size, color}) => (
                    <Feather name="bell" size={size} color={color}/>
                )
            }}
            />

            <Tab.Screen name="UserTab"
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