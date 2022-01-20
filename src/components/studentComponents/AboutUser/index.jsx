import { React } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {styles} from './styles'
import {Entypo, Feather} from '@expo/vector-icons';

export default function AboutUser() {
    return(

        <View style={styles.container}>
             <Image
             style={styles.profileImage}
             source={require('../../../assets/img/testes/freitas.png')}
             />
            <View style={styles.userContent}>
                <Text style={styles.userName}>Lucas Viana</Text>
                <Text style={styles.userCourse}>Análise de Sistemas</Text>
                <Text style={styles.userUniversity}>FATEC Faculdade de Tecnologia de Bragança Paulista</Text>
                <View style={styles.userLocationGrid}>
                    <Entypo name='location-pin' size={22} color={'#7a7979'} style= {{
                        position:'absolute',
                        left:-6
                    }}/>
                    <Text style={styles.userLocationText}>Atibaia, SP</Text>
                </View>
            </View>
        </View>

    );
}