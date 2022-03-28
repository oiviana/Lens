import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import CompanyHome  from '../../views/CompanyHome';

const Stack = createStackNavigator();

export default function CompanyHomeNavigator() {
    return(
       
            <Stack.Navigator>
                <Stack.Screen name="Home" component={CompanyHome} options={{ 
                }}/>
            </Stack.Navigator>
  
        
    );
}