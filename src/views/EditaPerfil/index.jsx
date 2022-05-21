import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
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
    const [areadata, setAreadata] = useState([{}]);
    const idArea = studentdata.Area?.id

    useEffect(() => {
        api.get(`studentprofile/${userData.id}`).then(response => {
            setStudentdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readAreas/${idArea}`).then(response => {
            setAreadata(response.data)
            console.log(response.data)
        }).catch(error => console.log("Erro: " + error))
    }, [])

    console.log("id da area " + idArea)
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

    const addresRef = useRef(null);
    function OpenAdrresModal() {
        addresRef.current?.open();
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
                <Text>{selectedArea}</Text>
            </View>

            <Divider width={3} color='#DCDCDC' />

            <TouchableOpacity style={styles.buttonAdress} onPress={OpenAdrresModal}>
                <Text style={styles.nameLabel}>Atualizar Endereço</Text>
                <Entypo name='location-pin' size={32} color={'#5f5f63'} style={{
                    marginLeft: 105
                }} />
            </TouchableOpacity>

            <Divider width={3} color='#DCDCDC' />

            <Modalize
                ref={addresRef}
                snapPoint={830}
            >
                <KeyboardAvoidingView style={styles.addresModal}>
                    <Text style={styles.addresModalLabel}>CEP:</Text>
                    <TextInput
                        style={styles.inputname}
                        autoCorrect={false}
                        selectionColor={'#5155b4'}
                        onChangeText={(text) => { setNome(text) }}
                        defaultValue={"CU"}
                    />
                    <Text style={styles.addresModalLabel}>Rua (Logradouro):</Text>
                    <TextInput
                        style={styles.inputname}
                        autoCorrect={false}
                        selectionColor={'#5155b4'}
                        onChangeText={(text) => { setNome(text) }}
                        defaultValue={"CU"}
                    />
                          <Text style={styles.addresModalLabel}>Bairro:</Text>
                    <TextInput
                        style={styles.inputname}
                        autoCorrect={false}
                        selectionColor={'#5155b4'}
                        onChangeText={(text) => { setNome(text) }}
                        defaultValue={"CU"}
                    />



                </KeyboardAvoidingView>
            </Modalize>


        </ScrollView>


    );
}