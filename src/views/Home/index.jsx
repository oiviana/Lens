import React, {useContext}  from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {styles} from './styles'
import { useAuth } from "../../hooks/useAuth";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
    const {userData, signOut} = useAuth()

    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
           <Text>
           Nome no contexto: {userData.nome}
               </Text> 
               <TouchableOpacity onPress={() => signOut()} style={{
                   backgroundColor:'pink',
                   width:100,
                   padding:30,
                   alignContent:'center',
                   marginLeft:100
               }}>
                   <Text>Sair</Text>
               </TouchableOpacity>
        </View>

    );
}