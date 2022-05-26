import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image,TouchableOpacity  } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo, Feather } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';
import * as Linking from 'expo-linking';


export default function CompanyPerfil() {
    const { userData } = useAuth();
    const [companydata, setCompanydata] = useState([{}]);
    const [adress, setAdress] = useState([{}]);
    useEffect(() => {
        api.get(`companyprofile/${userData.id}`).then(response => {
            setCompanydata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`companyender/${userData.id}`).then(response => {
            setAdress(response.data)
        }).catch(error => console.log("Erro: " + error))

    }, [])


    return (
        <ScrollView>
            <View style={styles.containerAboutUser}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/empresa/${companydata.imagem}`, }}
                />
                <View style={styles.userContent}>
                    <Text style={styles.userName}>{companydata.nome}</Text>
                    <Text style={styles.userCourse}>{companydata.Area?.nome_area}</Text>


                    <Text style={styles.companyActing}>{companydata.atuacao}</Text>

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
                    {companydata.sobre}
                </Text>
                <Text>Fundada em: {companydata?.ano_fundacao?.split('-').reverse().join('/')}</Text>

            </View>

            <Divider width={3} color='#DCDCDC' />

            <TouchableOpacity style={styles.websiteContainer} onPress={() => Linking.openURL(companydata.site)}>
                <Text style={styles.title}>Website</Text>
                <View style={styles.userLocationGrid}>
                    <Feather name='globe' size={30} color={'#52565c'} />
                    <Text style={styles.websiteText}>{companydata.site}</Text>
                </View>
            </TouchableOpacity>

            <Divider width={3} color='#DCDCDC' />

            <View style={styles.websiteContainer}>
                <Text style={styles.title}>Area de atuação:</Text>
                <View style={styles.userLocationGrid}>
                    <Feather name='target' size={30} color={'#52565c'} />
                    <Text style={styles.atuacaoText}>{companydata.atuacao}</Text>
                </View>
            </View>

            <Divider width={3} color='#DCDCDC' />

            <View style={styles.websiteContainer}>
                <Text style={styles.title}>Endereço:</Text>
                <View style={styles.userLocationGrid}>
                   
                    <Text style={styles.atuacaoText}>{adress.logradouro}, {adress.numero} - {adress.bairro}, {adress.cidade} - {adress.UF}, {adress.CEP}  </Text>
                </View>
            </View>

            <Divider width={3} color='#DCDCDC' />


        </ScrollView>
    );
}
