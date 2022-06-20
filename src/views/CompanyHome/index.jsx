import React from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import { styles } from './styles'
import { useAuth } from "../../hooks/useAuth";

export default function CompanyHome() {

    return (
    
        <View style={styles.container}>
                <StatusBar backgroundColor={'white'} barStyle='dark-content' />
      <View style={styles.welcomeRow}>
        <Image
          source={require("../../assets/img/icons/icon_v1.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeTxt}>Seja bem vindo ao Lens!</Text>
      </View>
    </View>

    );
}