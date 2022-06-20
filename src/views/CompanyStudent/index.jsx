import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo, Feather } from '@expo/vector-icons';
import api from '../../services/api';

export default function CompanyStudent({ route }) {
    const [studentdata, setStudentdata] = useState([{}]);
    const [formationdata, setFormationdata] = useState([{}]);
    const [atividadedata, setAtividadedata] = useState([{}]);
    const [currentformation, setCurrentformation] = useState();
    const [candidate, setCandidate] = useState();
    const [adress, setAdress] = useState([{}]);
    const idStudent = route.params.studentId
    const idVaga = route.params.idvaga
    useEffect(() => {
        api.get(`studentprofile/${idStudent}`).then(response => {
            setStudentdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readFormacao/${idStudent}`).then(response => {
            setFormationdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readAtividade/${idStudent}`).then(response => {
            setAtividadedata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`studentender/${idStudent}`).then(response => {
            setAdress(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`currentFormacao/${idStudent}`).then(response => {
            setCurrentformation(response.data.Instformacao.nome)

        }).catch(error => console.log("Erro: " + error))

        api.get(`checkCandCompany/${idStudent}&${idVaga}`).then(response => {

            if (response.data === 'Candidato') {
                console.log(response.data)
                setCandidate(true)
            } else { setCandidate(false) }

        }).catch(error => console.log("Erro: " + error))

    }, [candidate])


    async function chooseStudent() {
        const response = await api.patch(`/chooseStudent/${idStudent}&${idVaga}`)
        if (typeof response == 'object') {
            ToastAndroid.show("Estudante Selecionado", ToastAndroid.LONG)
            setCandidate(false);
            return
        }
        else {
            ToastAndroid.show("Ocorreu um erro, não foi possível realizar a operação", ToastAndroid.LONG)

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

    function yearOnly(date) {
        var data = new Date(date),
            anoF = data.getFullYear();
        return anoF;

    }
    function currentFormation(date) {
        var dateFormation = new Date(date);
        var currentDate = new Date();
        yearFormation = dateFormation.getFullYear();
        currentYear = currentDate.getFullYear();
        if (yearFormation > currentYear) {
            return 'Cursando'
        } else {
            return 'Concluído'
        }


    }

    return (
        <ScrollView>
            <View style={styles.containerAboutUser}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/estudante/${studentdata.imagem}`, }}
                />
                <View style={styles.userContent}>
                    <Text style={styles.userName}>{studentdata.nome} {studentdata.sobrenome}</Text>
                    <Text style={styles.userCourse}>{studentdata.Area?.nome_area}</Text>
                    <Text style={styles.userUniversity}>{currentformation}</Text>
                    <View style={styles.userLocationGrid}>
                        <Entypo name='location-pin' size={22} color={'#7a7979'} style={{
                            position: 'absolute',
                            left: -6
                        }} />
                        <Text style={styles.userLocationText}>{adress.cidade}, {adress.UF}</Text>
                    </View>
                </View>
            </View>

            <Divider width={3} color='#DCDCDC' />

            <View style={styles.containerDescription}>
                <Text style={styles.title}>Sobre mim</Text>
                <Text style={styles.descriptionContent}>
                    {studentdata.sobre}
                </Text>

            </View>

            <Divider width={3} color='#DCDCDC' />

            <View style={styles.containerFormations}>
                <Text style={styles.title}>Formação Acadêmica</Text>

                {formationdata.map((item, index) => {

                    return (
                        <View key={index}>
                            <View style={styles.content}>
                                <Image
                                    style={styles.institutionImage}
                                    source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/inst/${item?.Instformacao?.imagem}`, }}

                                />
                                <View style={styles.formationContent}>
                                    <Text style={styles.formationInstitution}>{item?.Instformacao?.nome}</Text>
                                    <Text style={styles.formationStatus}>{item?.curso} - {currentFormation(item.data_termino)}</Text>
                                    <Text style={styles.formationYear}>{yearOnly(item.data_inicio)} - {yearOnly(item.data_termino)}</Text>
                                </View>
                            </View>
                            <Divider width={1} color='#DCDCDC' />
                        </View>
                    );
                })}
            </View>

            <View style={styles.containerFormations}>
                <Text style={styles.title}>Atividades Extracurriculares</Text>

                {
                    atividadedata.length == 0 ? (
                        <Text style={styles.titleEmpty}>Adicione suas Atividades!</Text>
                    )
                        :
                        atividadedata.map((item, index) => {

                            return (
                                <View key={index}>
                                    <View style={styles.content} >
                                        <Feather name='check-circle' size={35} color={'#5f5f63'} style={{
                                            marginLeft: 3, marginRight: 11, alignSelf:'center'
                                        }} />
                                        <View style={styles.contentAtividades}>
                                            <Text style={styles.atividadetitle}>{item.titulo}</Text>
                                            <Text style={styles.atividadeContent}>{item.arquivo}</Text>
                                            <Text style={styles.formationYear}>{formatDate(item.createdAt)} - {item.tipo}</Text>
                                        </View>
                                    </View>

                                    <Divider width={1} color='#DCDCDC' />
                                </View>
                            );
                        }
                        )
                }

            </View>

            <Divider width={3} color='#DCDCDC' style={{ paddingTop: 22 }} />
            {candidate === true ? (
                <TouchableOpacity style={styles.selectedButton}
                    onPress={() => { chooseStudent()}}>
                    <Text style={styles.textButton}>Selecionar</Text>
                </TouchableOpacity>
            )
                : (
                    <>
                    <View style={styles. selectedButton2}>
                        <Text style={styles.textButton}>Selecionado!</Text>
                    </View>
                    <Text style={styles.succesButton}>Entre em contato com o Candidato através do email:<Text style={{fontWeight:'bold'}}> {studentdata.email}</Text></Text>
                    </>
                )}

        </ScrollView>
    );
}
