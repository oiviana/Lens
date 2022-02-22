import { React } from 'react';
import { Text, ScrollView,TouchableOpacity,Image,View} from 'react-native';
import {styles} from './styles';
import { Divider } from 'react-native-elements';

export default function Vagas() {
    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.content}>
             <Image
             style={styles.companyImage}
             source={require('../../assets/img/testes/logo_fatec.png')}
             />
              <View style={styles.vacancyContent}>
                <Text style={styles.vacancyTitle}>Desenvolvedor front-end</Text>
                <Text style={styles.vacancyCompany}>Nome da empresa - turno</Text>
                <Text style={styles.vacancyDate}>18/01/2022</Text>
              </View>
           </TouchableOpacity>
           <Divider width={1} color='#DCDCDC'/>

           <TouchableOpacity style={styles.content}>
             <Image
             style={styles.companyImage}
             source={require('../../assets/img/testes/logo_fatec.png')}
             />
              <View style={styles.vacancyContent}>
                <Text style={styles.vacancyTitle}>Desenvolvedor front-end</Text>
                <Text style={styles.vacancyCompany}>Nome da empresa - turno</Text>
                <Text style={styles.vacancyDate}>18/01/2022</Text>
              </View>
           </TouchableOpacity>
           <Divider width={1} color='#DCDCDC'/>
        </ScrollView>

    );
}