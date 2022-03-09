import { React } from 'react';
import { Text, ScrollView,TouchableOpacity,Image,View, FlatList} from 'react-native';
import {styles} from './styles';
import { Divider } from 'react-native-elements';
import vagas from '../../assets/vagas';

export default function Vagas({navigation}) {
    
    function getVagas({item}){
      return(
        <>
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('AboutVacancy')}>
        <Image
        style={styles.companyImage}
        source={require('../../assets/img/testes/logo_fatec.png')}
        />
         <View style={styles.vacancyContent}>
           <Text style={styles.vacancyTitle}>{item.nome}</Text>
           <Text style={styles.vacancyCompany}>{item.empresa} - {item.turno}</Text>
           <Text style={styles.vacancyDate}>{item.data}</Text>
         </View>
      </TouchableOpacity>
      <Divider width={1} color='#DCDCDC'/>
      </>
      );
    }
    return(
          <FlatList
          style={styles.container}
          keyExtractor={vaga => vaga.id.toString()}
          data={vagas}
          renderItem={getVagas}
          />


    );
}