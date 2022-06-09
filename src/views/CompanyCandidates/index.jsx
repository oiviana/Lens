import React, { useEffect, useState, useContext } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, TextInput } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

export default function CompanyCandidates({ navigation, route }) {

  const [candidates, setCandidates] = useState([{}]);
  const [search, setSearch] = useState('');
  const idvaga = route.params.vagaid

  useEffect(() => {

    if(search === ''){
      api.get(`/readCandidaturas/${idvaga}`).then(response => {
        setCandidates(response.data)
      }).catch(error => console.log("Texto depois" + error))

    }else{
      setCandidates(

        candidates.filter((item)=>{
          if(item.Estudante.nome.toLowerCase().indexOf(search.toLowerCase()) > -1){
            return true
          } else{
            return false
          }
        })

      );
    }

  },[search])

    function formatDate(date) {
      var data = new Date(date),
        dia = (data.getDate()),
        diaF = (dia.toString().length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1),
        mesF = (mes.toString().length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
      return (diaF) + "/" + mesF + "/" + anoF;
    }


  function getCandidates({ item }) {
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Candidato', { studentId: item.Estudante.id })}>
          <Image
            style={styles.companyImage}
            source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/estudante/${item?.Estudante?.imagem}`, }}
          />
          <View style={styles.vacancyContent}>
            <Text style={styles.vacancyTitle}>{item?.Estudante?.nome}</Text>
            <Text style={styles.vacancyDate}>Candidato desde: {formatDate(item.createdAt)}</Text>
          </View>
        </TouchableOpacity>
        <Divider width={1} color='#DCDCDC' />
      </>
    );
  }

  return (
    <>
      <TextInput
        style={styles.inputSearch}
        autoCorrect={false}
        selectionColor={'#5155b4'}
        onChangeText={(text) => { setSearch(text) }}
        placeholder='Filtrar Candidatos'
      />
      <FlatList
        style={styles.container}
        keyExtractor={() => Math.random()}
        data={candidates}
        renderItem={getCandidates}
      />
    </>
  );
}