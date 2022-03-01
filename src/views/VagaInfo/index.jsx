import { React } from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import {styles} from './styles';
import { Divider } from 'react-native-elements';

export default function VagaInfo() {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerVaga}>
            <Image
             style={styles.companyImage}
             source={require('../../assets/img/testes/logo_fatec.png')}
             />
             <Text style={styles.vacancyTitle}>Desenvolvedor Front-end</Text>
            </View>
            <View style={styles.dadosVaga}>
             <Text style={{fontWeight:'bold',fontSize:17,paddingBottom:3}}>Corebiz - Marketing e Perfomance</Text>
             <Text style={styles.dadoVaga}>Período: Manhã</Text>
             <Text style={styles.dadoVaga}>Anunciada em 01/02/2022</Text>
             <Text style={styles.dadoVaga}>30 Candidaturas</Text>
            </View>
            
            <Divider width={3} color='#DCDCDC'/>

            <View>
                <Text style={styles.title}>Sobre a vaga</Text>
                <Text style={styles.descriptionContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </Text>
            </View>

            <Divider width={3} color='#DCDCDC'/>

            
            <View>
                <Text style={styles.title}>Sobre a Empresa</Text>
                <Text style={styles.descriptionContent}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </Text>
            </View>
            <Divider width={3} color='#DCDCDC'/>
        </ScrollView>

    );
}