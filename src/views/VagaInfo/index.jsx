import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import {styles} from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';

export default function VagaInfo({route}) {
    const idvaga = route.params.vagaid
    const [vagainfo, setVagainfo] = useState([{}]);
    useEffect(() => {
        api.get(`aboutVaga/${idvaga}`).then(response => {
          setVagainfo(response.data)
        }).catch(error =>console.log("Erro: "+error) )
        
      }, [])




    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerVaga}>
            <Image
             style={styles.companyImage}
             source={require('../../assets/img/testes/empresas/logo_fatec.png')}
             />
             <Text style={styles.vacancyTitle}>{vagainfo.titulo}</Text>
            </View>
            <View style={styles.dadosVaga}>
             <Text style={{fontWeight:'bold',fontSize:17,paddingBottom:3}}>{vagainfo.Empresa?.nome}</Text>
             <Text style={styles.dadoVaga}>Período: {vagainfo.periodo}</Text>
             <Text style={styles.dadoVaga}>Anunciada em {vagainfo?.data?.split('-').reverse().join('/')}</Text>
             <Text style={styles.dadoVaga}>30 Candidaturas</Text>
            </View>
            
            <Divider width={3} color='#DCDCDC'/>

            <View>
                <Text style={styles.title}>Sobre a vaga</Text>
                <Text style={styles.descriptionContent}>
                    {vagainfo.descricao}
                </Text>
            </View>

            <Divider width={3} color='#DCDCDC'/>

            
            <View>
                <Text style={styles.title}>Sobre a Empresa</Text>
                <Text style={styles.descriptionContent}>
                {vagainfo.Empresa?.sobre}
                </Text>
            </View>
            <Divider width={3} color='#DCDCDC'/>
        </ScrollView>

    );
}