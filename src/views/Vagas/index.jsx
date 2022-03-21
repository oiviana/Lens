import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import api from '../../services/api';

export default function Vagas({ navigation }) {

  const [vagas, setVagas] = useState([{}]);
  useEffect(() => {
    api.get('/readVagas').then(response => {
      setVagas(response.data)
    }).catch(error =>console.log("Texto depois"+error) )
    
  }, [])


  function getVagas({ item }) {
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Sobre a Vaga',{vagaid: item.id})}>
          <Image
            style={styles.companyImage}
            source={require('../../assets/img/testes/empresas/logo_fatec.png')}
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
    <FlatList
      style={styles.container}
      keyExtractor={() => Math.random()}
      data={vagas}
      renderItem={getVagas}
    />
  );
}