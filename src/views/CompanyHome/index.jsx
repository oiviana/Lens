import React from 'react';
import {Text, View, StatusBar,TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { useAuth } from "../../hooks/useAuth";

export default function CompanyHome() {
    const { userData, signOut } = useAuth()

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
            <Text>
                ÁREA DE EMPRESA: {userData.nome}
            </Text>
            <TouchableOpacity onPress={() => signOut()} style={{
                backgroundColor: 'pink',
                width: 100,
                padding: 30,
                alignContent: 'center',
                marginLeft: 100
            }}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>

    );
}