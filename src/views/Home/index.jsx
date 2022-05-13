import React, {useContext, useState, useEffect}  from 'react';
import { StyleSheet, Text, View, StatusBar, Picker } from 'react-native';
import {styles} from './styles'
import { useAuth } from "../../hooks/useAuth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';

export default function Home() {
    const {userData, signOut} = useAuth()
    const [areas, setAreas] = useState([{}]);
    const [selectedValue, setSelectedValue] = useState("java");
    useEffect(() => {
      api.get('/readAreas').then(response => {
        setVagas(response.data)
        console.log(response.data)
      }).catch(error =>console.log("Texto depois"+error) )
      
    }, [])

    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
           <Text>
           ÁREA DE ESTUDANTE: {userData.nome}
               </Text> 
               <TouchableOpacity onPress={() => signOut()} style={{
                   backgroundColor:'pink',
                   width:100,
                   padding:30,
                   alignContent:'center',
                   marginLeft:100
               }}>
                   <Text>Sair</Text>
               </TouchableOpacity>
               <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

        </View>

    );
}