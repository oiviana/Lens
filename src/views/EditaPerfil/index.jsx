import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo, Feather } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';

export default function EditaPerfil() {
    const [nome, setNome] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const { userData } = useAuth();
    const [avatar, setAvatar] = useState();
    const [studentdata, setStudentdata] = useState([{}]);
    const [addressdata, setAddressdata] = useState([{}]);
    const [formationdata, setFormationdata] = useState([{}]);
    const [areadata, setAreadata] = useState([{}]);

    const idArea = studentdata.Area?.id
    useEffect(() => {

        api.get(`studentprofile/${userData.id}`).then(response => {
            setStudentdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readAreas/${idArea}`).then(response => {
            setAreadata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readFormacao/${userData.id}`).then(response => {
            setFormationdata(response.data)
        }).catch(error => console.log("Erro: " + error))
    }, [idArea])


    async function imagePickerCall() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                alert("Necessidade de PErmissão");
                return;
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        if (data.cancelled) {
            return;
        }
        if (!data.uri) {
            return;
        }
        setAvatar(data)
        console.log(data.uri)
    }

    const addresRef = useRef(null); //ref modal de endereço
    function OpenAdrresModal() {
        addresRef.current?.open();

        api.get(`/studentender/${userData.id}`).then(response => {
            setAddressdata(response.data)
        }).catch(error => console.log("Erro: " + error))
    }

    const formationRef = useRef(null); //ref modal de formações
    function OpenaddFormationModal() {
        formationRef.current?.open();
    }

    return (
        <ScrollView>
            <View style={styles.editImgContainer}>
                <TouchableOpacity onPress={imagePickerCall}>
                    <Image
                        source={{
                            uri: avatar
                                ? avatar.uri
                                : `http://192.168.1.10:3000/img/estudante/${studentdata.imagem}`
                        }}
                        style={styles.imgEdit}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.updateImgText}>Atualizar Imagem</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.nameLabel}>Nome Completo:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    defaultValue={studentdata.nome}
                />
                <Text style={styles.nameLabel}>Área de interesse:</Text>
                <Picker style={styles.pickerContainer}
                    selectedValue={selectedArea}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedArea(itemValue)}>
                    <Picker.Item label={studentdata.Area?.nome_area} value={studentdata.Area?.id} key={studentdata.id} />
                    {areadata.map((item) => <Picker.Item label={item.nome_area} value={item.id} key={item.id} />)}
                </Picker>
            </View>

            <Divider width={3} color='#DCDCDC' />

            <TouchableOpacity style={styles.buttonAdress} onPress={OpenAdrresModal}>
                <Text style={styles.nameLabel}>Atualizar Endereço</Text>
                <Entypo name='location-pin' size={32} color={'#5f5f63'} style={{
                    marginLeft: 105
                }} />
            </TouchableOpacity>

            <Divider width={3} color='#DCDCDC' />

            <View style={styles.formationContainers}>
                <Text style={styles.nameLabel}>Histórico Acadêmico</Text>

                {formationdata.map((item) => {

                    return (
                        <TouchableOpacity key={item.id} style={styles.formationButton}>
                            <View style={styles.content}>
                                <Image
                                    style={styles.institutionImage}
                                    source={{ uri: `http://192.168.1.10:3000/img/empresa/logo_fatec.png`, }}
                                />
                                <View style={styles.formationContent}>
                                    <Text style={styles.formationInstitution}>{item?.Instformacao?.nome}</Text>
                                    <Text style={styles.formationStatus}>{item?.curso} - Cursando</Text>
                                    <Text style={styles.formationYear}>2019 - 2022</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity style={styles.addformationButton} onPress={OpenaddFormationModal}>
                    <Feather name='plus-circle' size={25} color={'#5f5f63'} style={{
                        marginLeft: 105
                    }} />
                    <Text style={{ fontSize: 17, paddingLeft: 8, paddingTop: 1 }}>Adicionar formação</Text>

                </TouchableOpacity>
            </View>
            <View>

                {/* Adrress modal */}
                <Modalize
                    ref={addresRef}
                    adjustToContentHeight={true}
                    withReactModal={true}

                >
                    <KeyboardAvoidingView style={styles.addresModal}>
                        <Text style={styles.nameLabel}>CEP:</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setNome(text) }}
                            defaultValue={addressdata.CEP}
                            keyboardType='numeric'
                        />
                        <Text style={styles.nameLabel}>Rua (Logradouro):</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setNome(text) }}
                            defaultValue={addressdata.logradouro}
                        />
                        <Text style={styles.nameLabel}>Bairro:</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setNome(text) }}
                            defaultValue={addressdata.bairro}
                        />
                        <View style={styles.addresRow}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.addresModalLabel}>Número:</Text>
                                <TextInput
                                    style={styles.inputrow}
                                    autoCorrect={false}
                                    selectionColor={'#5155b4'}
                                    keyboardType='numeric'
                                    onChangeText={(text) => { setNome(text) }}
                                    defaultValue={JSON.stringify(addressdata.numero)}
                                />
                            </View>

                            <View style={styles.fieldSet}>
                                <Text style={styles.addresModalLabel}>UF:</Text>
                                <TextInput
                                    style={styles.inputrow}
                                    autoCorrect={false}
                                    selectionColor={'#5155b4'}
                                    onChangeText={(text) => { setNome(text) }}
                                    defaultValue={addressdata.UF}
                                />
                            </View>
                        </View>
                        <Text style={styles.nameLabel}>Cidade:</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setNome(text) }}
                            defaultValue={addressdata.cidade}
                        />
                        <TouchableOpacity style={styles.addresButton}
                            onPress={() => { Login() }}>
                            <Text style={styles.textButton}>Atualizar</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </Modalize>

                <Modalize
                    ref={formationRef}
                    adjustToContentHeight={true}
                    withReactModal={true}
                >
                    <KeyboardAvoidingView style={styles.addresModal}>




                    </KeyboardAvoidingView>
                </Modalize>
 
            </View>

        </ScrollView>


    );
}