import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, TextInput } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';

export default function Vagas({ navigation }) {

  const [vagas, setVagas] = useState([{}]);
  const [search, setSearch] = useState('');

  useEffect(() => {

    if(search === ''){
      api.get('/readVagas').then(response => {
        setVagas(response.data)
      }).catch(error => console.log("Texto depois" + error))

    }else{
      setVagas(

        vagas.filter((item)=>{
          if(item.titulo.toLowerCase().indexOf(search.toLowerCase()) > -1){
            return true
          } else{
            return false
          }
        })

      );
    }

  },[search])


  function getVagas({ item }) {
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Sobre a Vaga', { vagaid: item.id })}>
          <Image
            style={styles.companyImage}
            source={{ uri: `${process.env.REACT_APP_BASE_URL}/img/empresa/${item?.Empresa?.imagem}`, }}
          />
          <View style={styles.vacancyContent}>
            <Text style={styles.vacancyTitle}>{item.titulo}</Text>
            <Text style={styles.vacancyCompany}>{item?.Empresa?.nome} - {item.periodo}</Text>
            <Text style={styles.vacancyDate}>Data: {item?.data?.split('-').reverse().join('/')}</Text>
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
        placeholder='Buscar Vaga'
      />
      <FlatList
        style={styles.container}
        keyExtractor={() => Math.random()}
        data={vagas}
        renderItem={getVagas}
      />
    </>
  );
}