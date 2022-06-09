import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native';
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

export default function EditaPerfil() {
    const { userData } = useAuth();
    const [nome, setNome] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();

    const [cep, setCep] = useState();
    const [rua, setRua] = useState();
    const [num, setNum] = useState();
  
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [uf, setUf] = useState();

    const [selectedArea, setSelectedArea] = useState();
    const [selectedInst, setSelectedInst] = useState(1);
    const [selectedCurso, setSelectedCurso] = useState("Análise de Sistemas");
    const [selectedPeriodo, setSelectedPeriodo] = useState("Noturno");

    const [avatar, setAvatar] = useState();

    const [studentdata, setStudentdata] = useState([{}]);
    const [formationdata, setFormationdata] = useState([{}]);
    const [institutiondata, setInstitutiondata] = useState([{}]);
    const [areadata, setAreadata] = useState([{}]);

    const idArea = studentdata.Area?.id

    useEffect(() => {

        api.get(`studentprofile/${userData.id}`).then(response => {
            setStudentdata(response.data)
            setNome(response.data.nome)
            setDescription(response.data.sobre)
            setImg(response.data.imagem)
            setSelectedArea(response.data.areaId)

        }).catch(error => console.log("Erro: " + error))

        api.get(`readAreas/${idArea}`).then(response => {
            setAreadata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readInstitutions/`).then(response => {
            setInstitutiondata(response.data)
        }).catch(error => console.log("Erro: " + error))

        api.get(`readFormacao/${userData.id}`).then(response => {
            setFormationdata(response.data)
        }).catch(error => console.log("Erro: " + error))
    }, [idArea])


    async function imagePickerCall() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                alert("Necessidade de Permissão");
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
            setCep(response.data.CEP);
            setRua(response.data.logradouro);
            setNum(JSON.stringify(response.data.numero));
            setBairro(response.data.bairro);
            setCidade(response.data.cidade);
            setUf(response.data.UF);
    
        }).catch(error => console.log("Erro: " + error))
    }

    const formationRef = useRef(null); //ref modal de formações
    function OpenaddFormationModal() {
        formationRef.current?.open();
    }

    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [displaydate, setDisplayDate] = useState(formatDate(new Date()));
    const [displaydate2, setDisplayDate2] = useState(formatDate(new Date()));
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    function formatDate(date) {
        var data = new Date(date),
            dia = (data.getDate()),
            diaF = (dia.toString().length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1),
            mesF = (mes.toString().length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;

    }



    async function updateStudent() {
        const response = await api.patch(`/updateStudent/${userData.id}`, {
            nome: nome,
            description: description,
            area: selectedArea

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
        const response = await api.put(`/updateStudentender/${userData.id}`, {
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

    async function newFormation() {
        const response = await api.post('/createFormation', {
            curso: selectedCurso,
            data_inicio: displaydate.split('/').reverse().join('-'),
            data_termino: displaydate2.split('/').reverse().join('-'),
            periodo: selectedPeriodo,
            estudanteId: userData.id,
            instformacaoId: selectedInst
        })
        if (response.data === "erro") {
            ToastAndroid.show("Ocorreu algum erro", ToastAndroid.LONG)
            return
        }
        else {
            ToastAndroid.show("Formação Adicionada", ToastAndroid.LONG)
            formationRef.current?.close();
        }

    }

    function yearOnly(date) {
        var data = new Date(date),
            anoF = data.getFullYear();
        return anoF;

    }

    return (
        <ScrollView>
            <View style={styles.editImgContainer}>
                <TouchableOpacity onPress={imagePickerCall}>
                    <Image
                        source={{
                            uri: avatar
                                ? avatar.uri
                                : `${process.env.REACT_APP_BASE_URL}/img/estudante/${img}`
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
                    defaultValue={nome}
                />
                <Text style={styles.nameLabel}>Área de interesse:</Text>
                <Picker style={styles.pickerContainer}
                    selectedValue={selectedArea}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedArea(itemValue)}>
                    <Picker.Item label={studentdata.Area?.nome_area} value={studentdata.Area?.id} key={studentdata.id} />
                    {areadata.map((item, index) => <Picker.Item label={item.nome_area} value={item.id} key={index} />)}
                </Picker>
            </View>


            <Text style={styles.nameLabel}>Sobre Mim:</Text>
            <TextInput
                style={styles.inputdescription}
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={(text) => { setDescription(text) }}
                defaultValue={description}
                multiline={true}
            />

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

                {formationdata.map((item, index) => {

                    return (
                        <TouchableOpacity key={index} style={styles.formationButton}>
                            <View style={styles.content}>
                                <Image
                                    style={styles.institutionImage}
                                    source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/inst/${item?.Instformacao?.imagem}`, }}
                                />
                                <View style={styles.formationContent}>
                                    <Text style={styles.formationInstitution}>{item?.Instformacao?.nome}</Text>
                                    <Text style={styles.formationStatus}>{item?.curso} - Cursando</Text>
                                    <Text style={styles.formationYear}>{yearOnly(item.data_inicio)} - {yearOnly(item.data_termino)}</Text>
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

            <Divider width={3} color='#DCDCDC' />

            <TouchableOpacity style={styles.updateButton}
                onPress={() => { updateStudent() }}>
                <Text style={styles.textButton}>Atualizar</Text>
            </TouchableOpacity>
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

                <Modalize
                    ref={formationRef}
                    adjustToContentHeight={true}
                    withReactModal={true}
                >
                    <KeyboardAvoidingView style={styles.addresModal}>

                        <Text style={styles.nameLabel}>Curso:</Text>
                        <Picker style={styles.pickerContainer}
                            selectedValue={selectedCurso}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCurso(itemValue)}>
                            {cursos.map((item, index) => <Picker.Item label={item.nome} value={item.nome} key={index} />)}
                        </Picker>
                        <View style={styles.dateRow}>
                            <View>
                                <Text style={styles.dateLabel}>Data de início:</Text>
                                <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
                                    <Text style={styles.dateText} >{displaydate.toLocaleString()}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.dateLabel}>Data de término:</Text>
                                <TouchableOpacity style={styles.dateButton} onPress={() => setShow2(true)}>
                                    {<Text style={styles.dateText}>{displaydate2.toLocaleString()}</Text>}
                                </TouchableOpacity>
                            </View>

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setShow(false);
                                        setDate(currentDate);
                                        setDisplayDate(`${(currentDate.getDate().toString().length == 1) ? '0' + currentDate.getDate() : currentDate.getDate()}/${(currentDate.getMonth().toString().length == 1) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`)

                                    }}

                                />
                            )}
                            {show2 && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date2}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setShow2(false);
                                        setDate2(currentDate);
                                        setDisplayDate2(`${(currentDate.getDate().toString().length == 1) ? '0' + currentDate.getDate() : currentDate.getDate()}/${(currentDate.getMonth().toString().length == 1) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`)
                                    }}

                                />
                            )}
                        </View>
                        <Text style={styles.nameLabel}>Instituição:</Text>
                        <Picker style={styles.pickerContainer}
                            selectedValue={selectedInst}
                            onValueChange={(itemValue, itemIndex) =>{
                                setSelectedInst(itemValue)}}>
                            {institutiondata.map((item, index) => <Picker.Item label={item.nome} value={item.id} key={index} />)}
                        </Picker>

                        <Text style={styles.nameLabel}>Período:</Text>
                        <Picker style={styles.pickerContainer}
                            selectedValue={selectedPeriodo}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedPeriodo(itemValue)}>
                            <Picker.Item label={'Noturno'} value={'Noturno'} />
                            <Picker.Item label={'Manhã'} value={'Manhã'} />
                        </Picker>

                        <TouchableOpacity style={styles.addresButton}
                            onPress={() => { newFormation() }}>
                            <Text style={styles.textButton}>Adicionar</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </Modalize>

            </View>

        </ScrollView>


    );
}

//{item?.data?.split('-').reverse().join('/')}