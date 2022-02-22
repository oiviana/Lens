import { React } from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import {styles} from './styles';

export default function VagaInfo() {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerVaga}>
            <Image
             style={styles.companyImage}
             source={require('../../assets/img/testes/logo_fatec.png')}
             />
             <Text>Desenvolvedor Front-end</Text>
            </View>
        </ScrollView>

    );
}