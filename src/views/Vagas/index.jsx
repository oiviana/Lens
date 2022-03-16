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
    })
    console.log(vagas)
  }, [])


  function getVagas({ item }) {
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('AboutVacancy')}>
          <Image
            style={styles.companyImage}
            source={require('../../assets/img/testes/logo_fatec.png')}
          />
          <View style={styles.vacancyContent}>
            <Text style={styles.vacancyTitle}>{item.titulo}</Text>
            <Text style={styles.vacancyCompany}>{item?.Empresa?.nome} - {item.periodo}</Text>
            {console.log()}
            <Text style={styles.vacancyDate}>Data: {item.data}</Text>
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