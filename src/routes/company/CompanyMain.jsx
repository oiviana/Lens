import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompanyHomeNavigator from "./CompanyHomeNavigator";
import CompanyProfileNavigator from "./CompanyProfileNavigator";
import CompanyVacancyNavigator from "./CompanyVacancyNavigator";
import CompanyNotificationNavigator from "./CompanyNotificationNavigator";
import { Entypo, Feather } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function CompanyMain() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 55,
                    backgroundColor: '#EDEEF8',
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#616163',
                tabBarLabel: () => { return null },
                headerShown: false
            }}

        >
            <Tab.Screen
                name="HomeTab"
                component={CompanyHomeNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="grid" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="VacancyTab"
                component={CompanyVacancyNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="briefcase" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="NotifTab"
                component={CompanyNotificationNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="bell" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="UserTab"
                component={CompanyProfileNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />

                    )
                }}
            />

        </Tab.Navigator>
    )
}