import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-picker/picker';

export default function CompanyEditVaga({ route }) {
    const { userData } = useContext(AuthContext);
    const idvaga = route.params.vagaid
    const iduser = userData.id
    const [vagainfo, setVagainfo] = useState([{}]);
    const [status, setStatus] = useState();
    const [buttonCand, setbuttonCand] = useState(false);
    const [turno, setTurno] = useState();

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
            setbuttonCand(true)

        }

    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerScroll}>
                <Text style={styles.nameLabel}>Título:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { }}
                    defaultValue={vagainfo.titulo}
                    keyboardType='numeric'
                />

                <Text style={styles.nameLabel}>Descrição:</Text>
                <TextInput
                    style={styles. inputdescription}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { }}
                    defaultValue={vagainfo.descricao}
                    multiline={true}

                />

                <Text style={styles.nameLabel}>Status:</Text>
                {vagainfo?.status == 'Ativa'
                    ? (
                        <Picker style={styles.pickerContainer}
                            selectedValue={status}
                            onValueChange={(itemValue, itemIndex) =>
                                setStatus(itemValue)}>
                            <Picker.Item label={'Ativa'} value={'Ativa'} />
                            <Picker.Item label={'Inativa'} value={'Inativa'} />
                        </Picker>
                    )
                    : (
                        <Picker style={styles.pickerContainer}
                            selectedValue={status}
                            onValueChange={(itemValue, itemIndex) =>
                                setStatus(itemValue)}>
                            <Picker.Item label={'Inativa'} value={'Inativa'} />
                            <Picker.Item label={'Ativa'} value={'Ativa'} />
                        </Picker>
                    )
                }
                <Text style={styles.nameLabel}>Turno:</Text>
                {vagainfo?.periodo == 'Manhã'
                    ? (
                        <Picker style={styles.pickerContainer}
                            selectedValue={turno}
                            onValueChange={(itemValue, itemIndex) =>
                                setTurno(itemValue)}>
                            <Picker.Item label={'Manhã'} value={'Manhã'} />
                            <Picker.Item label={'Noturno'} value={'Noturno'} />
                        </Picker>
                    )
                    : (
                        <Picker style={styles.pickerContainer}
                            selectedValue={turno}
                            onValueChange={(itemValue, itemIndex) =>
                                setTurno(itemValue)}>
                            <Picker.Item label={'Noturno'} value={'Noturno'} />
                            <Picker.Item label={'Manhã'} value={'Manhã'} />
                        </Picker>
                    )
                }

                   <TouchableOpacity style={styles.candidaturaButton}
                        onPress={() => { Candidatura() }}>
                        <Text style={styles.textButton}>Atualizar</Text>
                    </TouchableOpacity>
            
            </ScrollView>
        </View>
    );
}