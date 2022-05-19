import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity,TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function EditaPerfil() {
    const [nome, setNome] = useState();
    const { userData } = useAuth();
    const [avatar, setAvatar] = useState();
    const [studentdata, setStudentdata] = useState([{}]);


    useEffect(() => {
        api.get(`studentprofile/${userData.id}`).then(response => {
            setStudentdata(response.data)
        }).catch(error => console.log("Erro: " + error))

        setNome(JSON.stringify(studentdata.nome))
        console.log(nome)

    }, [])


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




    return (
        <ScrollView>
            <View style={styles.editImgContainer}>
                <TouchableOpacity onPress={imagePickerCall}>
                    <Image
                        source={{
                            uri: avatar
                                ? avatar.uri
                                :`http://192.168.1.10:3000/img/estudante/${studentdata.imagem}`
                        }}
                        style={styles.imgEdit}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Atualizar Imagem</Text>
                </TouchableOpacity>
            </View>

            <View>
            <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                    value={studentdata.nome}

                />
            </View>
        </ScrollView>
    );
}