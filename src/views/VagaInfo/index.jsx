import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

export default function VagaInfo({ route }) {
    const { userData } = useContext(AuthContext);
    const idvaga = route.params.vagaid
    const iduser = userData.id
    const [vagainfo, setVagainfo] = useState([{}]);
    const [buttonCand, setbuttonCand] = useState(false);

    useEffect(() => {
        api.get(`aboutVaga/${idvaga}`).then(response => {
            setVagainfo(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`checkCandidatura/${iduser}&${idvaga}`).then(response => {

            if (typeof response.data == 'object') { // Se trazer um objeto, já há uma candidatura
            } else {
                setbuttonCand(true)
            }
        }).catch(error => console.log("Erro: " + error))

    }, [buttonCand])



    async function Candidatura() {
        const response = await api.post('/createCandidatura', {
            estudanteId: iduser,
            vagaId: idvaga
        })
        console.log(response.data)
        if (response.data === "erro") {
            ToastAndroid.show("Ocorreu um erro", ToastAndroid.LONG)
        }
        else {
            ToastAndroid.show("Agora você é um candidato!", ToastAndroid.LONG)
            setbuttonCand(false)

        }

    }
    function formatDate(date) {
        var data = new Date(date),
          dia = (data.getDate()),
          diaF = (dia.toString().length == 1) ? '0' + dia : dia,
          mes = (data.getMonth() + 1),
          mesF = (mes.toString().length == 1) ? '0' + mes : mes,
          anoF = data.getFullYear();
        return (diaF) + "/" + mesF + "/" + anoF;
      }

    return (
        <View>
        <ScrollView style={styles.container}>
            <View style={styles.headerVaga}>
                <Image
                    style={styles.companyImage}
                    source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/empresa/${vagainfo.Empresa?.imagem}`,}}
                />
                <Text style={styles.vacancyTitle}>{vagainfo.titulo}</Text>
            </View>
            <View style={styles.dadosVaga}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, paddingBottom: 3 }}>{vagainfo.Empresa?.nome}</Text>
                <Text style={styles.dadoVaga}>Período: {vagainfo.periodo}</Text>
                <Text style={styles.dadoVaga}>Anunciada em {formatDate(vagainfo.createdAt)}</Text>
                <Text style={styles.dadoVaga}>30 Candidaturas</Text>
            </View>

            <Divider width={3} color='#DCDCDC' />

            <View>
                <Text style={styles.title}>Sobre a vaga</Text>
                <Text style={styles.descriptionContent}>
                    {vagainfo.descricao}
                </Text>
            </View>

            <Divider width={3} color='#DCDCDC' />


            <View>
                <Text style={styles.title}>Sobre a Empresa</Text>
                <Text style={styles.descriptionContent}>
                    {vagainfo.Empresa?.sobre}
                </Text>
            </View>

            <Divider width={3} color='#DCDCDC' />

            {buttonCand === true ? (
                <TouchableOpacity style={styles.candidaturaButton}
                    onPress={() => { Candidatura() }}>
                    <Text style={styles.textButton}>Candidatar-se</Text>
                </TouchableOpacity>
            )
                :(
                <View style={styles.candidatoButton}>
                    <Text style={styles.textButton}>Candidato!</Text>
                </View>
                )}
                
        </ScrollView>
        </View>
    );
}