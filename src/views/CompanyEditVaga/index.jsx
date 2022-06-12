import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ToastAndroid, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-picker/picker';
import { Entypo, Feather } from '@expo/vector-icons';

export default function CompanyEditVaga({ navigation, route }) {
    const { userData } = useContext(AuthContext);
    const idvaga = route.params.vagaid
    const [vagainfo, setVagainfo] = useState([{}]);
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [status, setStatus] = useState();
    const [turno, setTurno] = useState();

    useEffect(() => {
        api.get(`aboutVaga/${idvaga}`).then(response => {
            setVagainfo(response.data)
            setTitulo(response.data.titulo)
            setDescricao(response.data.descricao)
            setStatus(response.data.status)
            setTurno(response.data.periodo)
        }).catch(error => console.log("Erro: " + error))


    }, [])
    async function updateVacancy() {
        const response = await api.patch(`/updateVaga/${idvaga}`, {
            titulo: titulo,
            descricao: descricao,
            status: status,
            periodo: turno

        })
        if (typeof response == 'object') {
            ToastAndroid.show("Vaga atualizada", ToastAndroid.LONG)
            navigation.navigate('Suas Vagas')
            return
        }
        else {
            ToastAndroid.show("Ocorreu um erro, não foi possível atualizar os dados", ToastAndroid.LONG)

        }
    }

    async function deleteVaga() {
        const response = await api.delete(`/deleteVaga/${idvaga}`)
        console.log("response: ",response.data)
        if (response.data == 'deletado') {
            ToastAndroid.show("Vaga Deletada", ToastAndroid.LONG)
            navigation.navigate('Suas Vagas')
            return
        }
        else {
            ToastAndroid.show("Ocorreu um erro, não foi possível excluir", ToastAndroid.LONG)

        }
    }

    const deleteAlert = () =>
        Alert.alert(
            "Tem certeza que deseja excluir esta vaga?",
            "",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Excluir", onPress: () => { deleteVaga() } }
            ]
        );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.containerScroll}>
                <Text style={styles.nameLabel}>Título:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setTitulo(text) }}
                    defaultValue={titulo}
                />

                <Text style={styles.nameLabel}>Descrição:</Text>
                <TextInput
                    style={styles.inputdescription}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setDescricao(text) }}
                    defaultValue={descricao}
                    multiline={true}

                />

                <Text style={styles.nameLabel}>Status:</Text>
                {status == 'Ativa'
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
                {turno == 'Manhã'
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

                <Divider width={3} color='#DCDCDC' />
                <TouchableOpacity style={styles.buttonCands} onPress={() => { navigation.navigate('Candidatos', { vagaid: vagainfo.id }) }}>
                    <Feather name='crosshair' size={35} color={'#5f5f63'} style={{
                        marginLeft: 30
                    }} />
                    <Text style={styles.nameLabel}>Veja quem se candidatou</Text>
                </TouchableOpacity>

                <Divider width={3} color='#DCDCDC' />

                <TouchableOpacity style={styles.candidaturaButton}
                    onPress={() => { updateVacancy() }}>
                    <Text style={styles.textButton}>Atualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton}
                    onPress={() => { deleteAlert() }}>
                    <Text style={styles.textButton}>Excluir vaga</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}