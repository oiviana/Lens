import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { styles } from './styles'
import { useAuth } from "../../hooks/useAuth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Network from "expo-network"

export default function Home() {
  const { signOut } = useAuth()
  const [avatar, setAvatar] = useState();

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        alert("Necessidade de PErmissão");
        return;
      }
    }

   const data = await ImagePicker.launchImageLibraryAsync({
     mediaTypes:ImagePicker.MediaTypeOptions.Images,
     allowsEditing:true
   })

   if(data.cancelled){
     return;
   }
   if(!data.uri){
    return;
  }
  setAvatar(data)
  }

  async function uploadImage() {
    console.log({avatar})
    const data = new FormData();

    data.append('avatar', {
      uri: avatar.uri,
      // type: 'image/jpeg'
    });
    console.log({data})


    api.patch(`uploadImage`, data).then(res => {
  }).catch(error => console.log("Erro: " + error))

  }

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle='dark-content' />

      <TouchableOpacity onPress={() => signOut()} style={{
        backgroundColor: 'pink',
        width: 100,
        padding: 30,
        alignContent: 'center',
        marginLeft: 100
      }}>
        <Text>Sair</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={imagePickerCall}>
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : 'https://blog.img.com.br/wp-content/uploads/2018/02/avatar-1577909_640.png'
        }}
        style={{ width: 100, height: 100 }}
      />
      </TouchableOpacity>
    
      <TouchableOpacity onPress={uploadImage} style={{
        backgroundColor: 'red',
        width: 100,
        padding: 30,
        alignContent: 'center',
        marginLeft: 100,
        marginBottom: 20
      }}>
        <Text>Enviar Imagem</Text>
      </TouchableOpacity>


    </View>

  );
}