import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-picker/picker';
import { Entypo, Feather } from '@expo/vector-icons';

export default function CompanyEditVaga({navigation,route}) {
    const { userData } = useContext(AuthContext);
    const idvaga = route.params.vagaid
    const [vagainfo, setVagainfo] = useState([{}]);
    const [status, setStatus] = useState();
    const [turno, setTurno] = useState();

    useEffect(() => {
        api.get(`aboutVaga/${idvaga}`).then(response => {
            setVagainfo(response.data)
        }).catch(error => console.log("Erro: " + error))
  

    }, [])


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
                    style={styles.inputdescription}
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
                
                <Divider width={3} color='#DCDCDC' />
                <TouchableOpacity style={styles.buttonCands} onPress={() => {navigation.navigate('Candidatos', { vagaid: vagainfo.id }) }}>
                    <Feather name='crosshair' size={35} color={'#5f5f63'} style={{
                        marginLeft: 30
                    }} />
                    <Text style={styles.nameLabel}>Veja quem se candidatou</Text>
                </TouchableOpacity>
                
                <Divider width={3} color='#DCDCDC' />

                <TouchableOpacity style={styles.candidaturaButton}
                    onPress={() => { Candidatura() }}>
                    <Text style={styles.textButton}>Atualizar</Text>
                </TouchableOpacity>



            </ScrollView>
        </View>
    );
}