import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { styles } from './styles';
import { Entypo, Feather } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import api from '../../services/api';
import { useAuth } from "../../hooks/useAuth";

export default function CompanyVagas({ navigation }) {
  const { userData } = useAuth();
  const [vagas, setVagas] = useState([{}]);

  useEffect(() => {
    api.get(`/readVagasbycompany/${userData.id}`).then(response => {
      setVagas(response.data)
    }).catch(error => console.log("Texto depois" + error))

  }, [])


  function getVagas({ item }) {
    return (

      <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Sobre a Vaga', { vagaid: item.id })}>
          <View style={styles.vacancyContent}>
            <Text style={styles.vacancyTitle}>{item.titulo}</Text>
            <Text style={styles.vacancyCompany}> Turno: {item.periodo}</Text>
            <Text style={styles.vacancyDate}>Data: {item?.data?.split('-').reverse().join('/')}</Text>
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
      <TouchableOpacity style={styles.vacancyButton}>
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
    </>
  );
}