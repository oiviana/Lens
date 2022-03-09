import React, {useContext}  from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {styles} from './styles'

import { AuthContext } from '../../contexts/auth';

export default function Home() {
    const {nome} = useContext(AuthContext);

    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
           <Text>
           Nome no contexto: {nome}
               </Text> 
        </View>

    );
}