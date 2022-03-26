import React, {useContext}  from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {styles} from './styles'
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
    const {userData} = useAuth()

    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
           <Text>
           Nome no contexto: {userData.nome}
               </Text> 
        </View>

    );
}