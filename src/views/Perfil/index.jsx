import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';

export default function Perfil() {
    const { userData } = useAuth();
    const [studentdata, setStudentdata] = useState([{}]);
    const [formationdata, setFormationdata] = useState([{}]);
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

    }, [])

    function getFormacoes({ item }) {
        return (
            <>
                <View style={styles.content}>
                    <Image
                        style={styles.institutionImage}
                       source={{uri: `http://192.168.1.10:3000/img/empresa/logo_fatec.png`,} }
                        
                    />
                    <View style={styles.formationContent}>
                        <Text style={styles.formationInstitution}>{item?.Instformacao?.nome}</Text>
                        <Text style={styles.formationStatus}>{item?.curso} - Cursando</Text>
                        <Text style={styles.formationYear}>2019 - 2022</Text>
                    </View>
                </View>
                <Divider width={1} color='#DCDCDC' />
            </>
        );
    }



    return (
        <View>
            <View style={styles.containerAboutUser}>
                <Image
                    style={styles.profileImage}
                    source={{uri: `http://192.168.1.10:3000/img/estudante/${studentdata.imagem}`,}}
                />
                <View style={styles.userContent}>
                    <Text style={styles.userName}>{studentdata.nome} {studentdata.sobrenome}</Text>
                    <Text style={styles.userCourse}>{studentdata.Area?.nome_area}</Text>
                    <Text style={styles.userUniversity}>FATEC Faculdade de Tecnologia de Bragança Paulista</Text>
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

                <FlatList
                    keyExtractor={() => Math.random()}
                    data={formationdata}
                    renderItem={getFormacoes}
                />


            </View>
        </View>
    );
}