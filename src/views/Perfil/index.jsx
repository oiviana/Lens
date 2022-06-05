import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image,} from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';

export default function Perfil() {
    const { userData } = useAuth();
    const [studentdata, setStudentdata] = useState([{}]);
    const [formationdata, setFormationdata] = useState([{}]);
    const [currentformation, setCurrentformation] = useState();
    const [adress, setAdress] = useState([{}]);
    useEffect(() => {
        api.get(`studentprofile/${userData.id}`).then(response => {
            setStudentdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readFormacao/${userData.id}`).then(response => {
            setFormationdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`studentender/${userData.id}`).then(response => {
            setAdress(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`currentFormacao/${userData.id}`).then(response => {
            setCurrentformation(response.data.Instformacao.nome)
    
        }).catch(error => console.log("Erro: " + error))

    }, [])

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
        if(yearFormation > currentYear){
            return 'Cursando'
        }else{
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

                {formationdata.map((item,index) => {

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
        </ScrollView>
    );
}
