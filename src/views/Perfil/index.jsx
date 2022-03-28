import React, {useEffect, useState}  from 'react';
import { Text, View, ScrollView, Image, } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';

export default function Perfil() {
    const {userData} = useAuth()
    const [studentdata, setStudentdata] = useState([{}]);
    useEffect(() => {
        api.get(`studentprofile/${userData.id}`).then(response => {
          setStudentdata(response.data)
        }).catch(error =>console.log("Erro: "+error) )
        
      }, [])
    return (
        <ScrollView>
            <View style={styles.containerAboutUser}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/img/testes/freitas.png')}
                />
                <View style={styles.userContent}>
                    <Text style={styles.userName}>{studentdata.nome} {studentdata.sobrenome}</Text>
                    <Text style={styles.userCourse}>Análise de Sistemas</Text>
                    <Text style={styles.userUniversity}>FATEC Faculdade de Tecnologia de Bragança Paulista</Text>
                    <View style={styles.userLocationGrid}>
                        <Entypo name='location-pin' size={22} color={'#7a7979'} style={{
                            position: 'absolute',
                            left: -6
                        }} />
                        <Text style={styles.userLocationText}>Atibaia, SP</Text>
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
                <View style={styles.content}>
                    <Image
                        style={styles.institutionImage}
                        source={require('../../assets/img/testes/empresas/logo_fatec.png')}
                    />
                    <View style={styles.formationContent}>
                        <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                        <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                        <Text style={styles.formationYear}>2019 - 2022</Text>
                    </View>
                </View>
                <Divider width={1} color='#DCDCDC' />

                <View style={styles.content}>
                    <Image
                        style={styles.institutionImage}
                        source={require('../../assets/img/testes/empresas/logo_fatec.png')}
                    />
                    <View style={styles.formationContent}>
                        <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                        <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                        <Text style={styles.formationYear}>2019 - 2022</Text>
                    </View>
                </View>
                <Divider width={1} color='#DCDCDC' />

                <View style={styles.content}>
                    <Image
                        style={styles.institutionImage}
                        source={require('../../assets/img/testes/empresas/logo_fatec.png')}
                    />
                    <View style={styles.formationContent}>
                        <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                        <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                        <Text style={styles.formationYear}>2019 - 2022</Text>
                    </View>
                </View>
                <Divider width={1} color='#DCDCDC' />

                <View style={styles.content}>
                    <Image
                        style={styles.institutionImage}
                        source={require('../../assets/img/testes/empresas/logo_fatec.png')}
                    />
                    <View style={styles.formationContent}>
                        <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                        <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                        <Text style={styles.formationYear}>2019 - 2022</Text>
                    </View>
                </View>
                <Divider width={1} color='#DCDCDC' />
            </View>
        </ScrollView>
    );
}