import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles';
import cursos from '../../assets/cursos';
import { Entypo, Feather } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CompanyEdita() {
    const [nome, setNome] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const { userData } = useAuth();
    const [avatar, setAvatar] = useState();
    const [companydata, setCompanydata] = useState([{}]);
    const [addressdata, setAddressdata] = useState([{}]);
    const [areadata, setAreadata] = useState([{}]);
    const idArea = companydata.Area?.id

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        var tempDate = new Date(currentDate);
        var formatDate = `${tempDate.getDate()}/0${(tempDate.getMonth() + 1)}/${tempDate.getFullYear()}`
        setDate(formatDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    useEffect(() => {

        api.get(`companyprofile/${userData.id}`).then(response => {
            setCompanydata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readAreas/${idArea}`).then(response => {
            setAreadata(response.data)
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

        api.get(`/companyender/${userData.id}`).then(response => {
            setAddressdata(response.data)
        }).catch(error => console.log("Erro: " + error))
    }


    return (
        <ScrollView>
            <View style={styles.editImgContainer}>
                <TouchableOpacity onPress={imagePickerCall}>
                    <Image
                        source={{
                            uri: avatar
                                ? avatar.uri
                                : `${process.env.REACT_APP_BASE_URL}/img/empresa/${companydata.imagem}`
                        }}
                        style={styles.imgEdit}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.updateImgText}>Atualizar Imagem</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.nameLabel}>Nome Comercial:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    defaultValue={companydata.nome}
                />
                <Text style={styles.nameLabel}>Área de interesse:</Text>
                <Picker style={styles.pickerContainer}
                    selectedValue={selectedArea}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedArea(itemValue)}>
                    <Picker.Item label={companydata.Area?.nome_area} value={companydata.Area?.id} key={companydata.id} />
                    {areadata.map((item, index) => <Picker.Item label={item.nome_area} value={item.id} key={index} />)}
                </Picker>

                <Text style={styles.nameLabel}>Sobre Mim:</Text>
                <TextInput
                    style={styles.inputdescription}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    defaultValue={companydata.sobre}
                    multiline={true}
                />

                <Text style={styles.nameLabel}>Área de atuação:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    defaultValue={companydata.atuacao}
                />

                <Text style={styles.nameLabel}>Site:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    defaultValue={companydata.site}
                />
            </View>

            <Divider width={3} color='#DCDCDC' />

            <TouchableOpacity style={styles.buttonAdress} onPress={OpenAdrresModal}>
                <Text style={styles.nameLabel}>Atualizar Endereço</Text>
                <Entypo name='location-pin' size={32} color={'#5f5f63'} style={{
                    marginLeft: 105
                }} />
            </TouchableOpacity>

            <Divider width={3} color='#DCDCDC' style={{marginBottom:15}}/>


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
            </View>

        </ScrollView>


    );
}