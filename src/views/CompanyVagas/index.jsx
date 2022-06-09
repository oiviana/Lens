import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, TextInput } from 'react-native';
import { styles } from './styles';
import { Entypo, Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { useAuth } from "../../hooks/useAuth";
import { Picker } from '@react-native-picker/picker';

export default function CompanyVagas({ navigation }) {
  const { userData } = useAuth();
  const [vagas, setVagas] = useState([{}]);
  const [turno, setTurno] = useState();

  const vacancyRef = useRef(null); //ref modal de formações
  function OpenVacancyModal() {
    vacancyRef.current?.open();
  }

  useEffect(() => {
    api.get(`/readVagasbycompany/${userData.id}`).then(response => {
      setVagas(response.data)
    }).catch(error => console.log("Texto depois" + error))

  }, [])


  function getVagas({ item }) {

    function formatDate(date) {
      var data = new Date(date),
        dia = (data.getDate()),
        diaF = (dia.toString().length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1),
        mesF = (mes.toString().length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
      return (diaF) + "/" + mesF + "/" + anoF;

    }
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Editar Vaga', { vagaid: item.id })}>
          <View style={styles.vacancyContent}>
            <Text style={styles.vacancyTitle}>{item.titulo}</Text>
            <Text style={styles.vacancyCompany}> Turno: {item.periodo}</Text>
            <Text style={styles.vacancyDate}>Data: {formatDate(item?.createdAt)}</Text>
            {item?.status == 'Ativa'
              ? (
                <View style={styles.vacancyStatus}>
                  <Text style={styles.statustext}>{item?.status}</Text>
                </View>
              )
              : (
                <View style={styles.vacancyStatusI}>
                  <Text style={styles.statustext}>{item?.status}</Text>
                </View>
              )
            }
          </View>
        </TouchableOpacity>
        <Divider width={1} color='#DCDCDC' />
      </>
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.vacancyButton} onPress={OpenVacancyModal}>
        <Feather name='plus-circle' size={25} color={'#5f5f63'} style={{
          marginLeft: 105
        }} />
        <Text style={{ fontSize: 19, paddingLeft: 8, paddingTop: 1 }}>Lançar Vaga</Text>

      </TouchableOpacity>
      <FlatList
        style={styles.container}
        keyExtractor={() => Math.random()}
        data={vagas}
        renderItem={getVagas}
      />


      <Modalize
        ref={vacancyRef}
        adjustToContentHeight={true}
        withReactModal={true}

      >
        <KeyboardAvoidingView style={styles.vacancyModal}>
          <Text style={styles.modalTitle}>Nova Vaga</Text>
          <Text style={styles.nameLabel}>Título:</Text>
          <TextInput
            style={styles.inputname}
            autoCorrect={false}
            selectionColor={'#5155b4'}
            onChangeText={() => { }}
            defaultValue={"oi"}
          />
          <Text style={styles.nameLabel}>Descrição:</Text>
          <TextInput
            style={styles.inputdescription}
            autoCorrect={false}
            selectionColor={'#5155b4'}
            onChangeText={() => { }}
            defaultValue={"oi"}
            multiline={true}
          />
          <Text style={styles.nameLabel}>Turno:</Text>
          <Picker style={styles.pickerContainer}
            selectedValue={turno}
            onValueChange={(itemValue, itemIndex) =>
              setTurno(itemValue)}>
            <Picker.Item label={'Noturno'} value={'Noturno'} />
            <Picker.Item label={'Manhã'} value={'Manha'} />
          </Picker>

          <TouchableOpacity style={styles.addresButton}
            onPress={() => { }}>
            <Text style={styles.textButton}>Lançar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modalize>
    </>

  );
}