import { React } from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {styles} from './styles'
import { Divider } from 'react-native-elements';


export default function UserFormation() {
    return(

        <View style={styles.container}>
            <Text style={styles.title}>Formação Acadêmica</Text>
            <View style={styles.content}>
             <Image
             style={styles.institutionImage}
             source={require('../../../assets/img/testes/logo_fatec.png')}
             />
             <View style={styles.formationContent}>
                <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                <Text style={styles.formationYear}>2019 - 2022</Text>
            </View>
        </View>
        <Divider width={1} color='#DCDCDC'/>

        <View style={styles.content}>
             <Image
             style={styles.institutionImage}
             source={require('../../../assets/img/testes/logo_fatec.png')}
             />
             <View style={styles.formationContent}>
                <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                <Text style={styles.formationYear}>2019 - 2022</Text>
            </View>
        </View>
        <Divider width={1} color='#DCDCDC'/>

        <View style={styles.content}>
             <Image
             style={styles.institutionImage}
             source={require('../../../assets/img/testes/logo_fatec.png')}
             />
             <View style={styles.formationContent}>
                <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                <Text style={styles.formationYear}>2019 - 2022</Text>
            </View>
        </View>
        <Divider width={1} color='#DCDCDC'/>

            <View style={styles.content}>
             <Image
             style={styles.institutionImage}
             source={require('../../../assets/img/testes/logo_fatec.png')}
             />
             <View style={styles.formationContent}>
                <Text style={styles.formationInstitution}>Fatec Bragança Paulista</Text>
                <Text style={styles.formationStatus}>Análise de Sistemas - Cursando</Text>
                <Text style={styles.formationYear}>2019 - 2022</Text>
            </View>
        </View>
        <Divider width={1} color='#DCDCDC'/>
        </View>

        

    );
}