import { React } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {styles} from './styles'

export default function Home() {
    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle='dark-content' />
           <Text>
           Essa é a home
               </Text> 
        </View>

    );
}