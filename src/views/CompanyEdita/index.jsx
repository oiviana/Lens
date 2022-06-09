import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles';
import { Entypo, Feather } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';


export default function CompanyEdita() {
    const { userData } = useAuth();
    const [nome, setNome] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();
    const [atuacao, setAtuacao] = useState();
    const [site, setSite] = useState();
    const [selectedArea, setSelectedArea] = useState();

    const [avatar, setAvatar] = useState();
    const [companydata, setCompanydata] = useState([{}]);
    const [areadata, setAreadata] = useState([{}]);
    const idArea = companydata.Area?.id

    const [cep, setCep] = useState();
    const [rua, setRua] = useState();
    const [num, setNum] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [uf, setUf] = useState();



    useEffect(() => {

        api.get(`companyprofile/${userData.id}`).then(response => {
            setCompanydata(response.data)
            setNome(response.data.nome)
            setDescription(response.data.sobre)
            setImg(response.data.imagem)
            setSelectedArea(response.data.areaId)
            setAtuacao(response.data.atuacao)
            setSite(response.data.site)
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
            setCep(response.data.CEP);
            setRua(response.data.logradouro);
            setNum(JSON.stringify( response.data.numero));
            setBairro(response.data.bairro);
            setCidade(response.data.cidade);
            setUf(response.data.UF);
        }).catch(error => console.log("Erro: " + error))
    }

    async function updateCompany() {
        const response = await api.patch(`/updateCompany/${userData.id}`, {
            nome: nome,
            description: description,
            area: selectedArea,
            site: site,
            atuacao: atuacao

        })
        if (typeof response == 'object') {
            ToastAndroid.show("Dados Atualizados", ToastAndroid.LONG)
            return
        }
        else {
            ToastAndroid.show("Ocorreu um erro, não foi possível atualizar os dados", ToastAndroid.LONG)
        }
    }

    async function updateAddress() {
        const response = await api.post(`/updatecompanyender/${userData.id}`, {
            cep: cep,
            logradouro: rua,
            numero: parseInt(num),
            bairro: bairro,
            cidade: cidade,
            uf: uf

        })
        if (typeof response == 'object') {
            ToastAndroid.show("Endereço atualizado", ToastAndroid.LONG)
            return
        }
        else {
            ToastAndroid.show("Ocorreu um erro, não foi possível atualizar os dados", ToastAndroid.LONG)
         
        }
    }


    return (
        <ScrollView>
            <View style={styles.editImgContainer}>
                <TouchableOpacity onPress={imagePickerCall}>
                    <Image
                        source={{
                            uri: avatar
                                ? avatar.uri
                                : `${process.env.REACT_APP_BASE_URL}/img/empresa/${img}`
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
                    defaultValue={nome}
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
                    onChangeText={(text) => { setDescription(text) }}
                    defaultValue={description}
                    multiline={true}
                />

                <Text style={styles.nameLabel}>Área de atuação:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setAtuacao(text) }}
                    defaultValue={atuacao}
                />

                <Text style={styles.nameLabel}>Site:</Text>
                <TextInput
                    style={styles.inputname}
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setSite(text) }}
                    defaultValue={site}
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
                            onChangeText={(text) => { setCep(text) }}
                            defaultValue={cep}
                            keyboardType='numeric'
                        />
                        <Text style={styles.nameLabel}>Rua (Logradouro):</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setRua(text) }}
                            defaultValue={rua}
                        />
                        <Text style={styles.nameLabel}>Bairro:</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setBairro(text) }}
                            defaultValue={bairro}
                        />
                        <View style={styles.addresRow}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.addresModalLabel}>Número:</Text>
                                <TextInput
                                    style={styles.inputrow}
                                    autoCorrect={false}
                                    selectionColor={'#5155b4'}
                                    keyboardType='numeric'
                                    onChangeText={(text) => { setNum(text) }}
                                    defaultValue={num}
                                />
                            </View>

                            <View style={styles.fieldSet}>
                                <Text style={styles.addresModalLabel}>UF:</Text>
                                <TextInput
                                    style={styles.inputrow}
                                    autoCorrect={false}
                                    selectionColor={'#5155b4'}
                                    onChangeText={(text) => { setUf(text) }}
                                    defaultValue={uf}
                                />
                            </View>
                        </View>
                        <Text style={styles.nameLabel}>Cidade:</Text>
                        <TextInput
                            style={styles.inputname}
                            autoCorrect={false}
                            selectionColor={'#5155b4'}
                            onChangeText={(text) => { setCidade(text) }}
                            defaultValue={cidade}
                        />
                        <TouchableOpacity style={styles.addresButton}
                            onPress={() => { updateAddress() }}>
                            <Text style={styles.textButton}>Atualizar</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </Modalize>
            </View>

        </ScrollView>


    );
}