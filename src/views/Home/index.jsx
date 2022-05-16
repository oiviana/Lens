import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { styles } from './styles'
import { useAuth } from "../../hooks/useAuth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function Home() {
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
    const data = new FormData();

    data.append('avatar', {
      uri: avatar.uri,
      type: avatar.type
    });
    await axios.post('http://localhost:3000/img', data);

  }

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle='dark-content' />
      <Text>
        ÁREA DE ESTUDANTE:
      </Text>
      <TouchableOpacity onPress={() => signOut()} style={{
        backgroundColor: 'pink',
        width: 100,
        padding: 30,
        alignContent: 'center',
        marginLeft: 100
      }}>
        <Text>Sair</Text>
      </TouchableOpacity>
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : 'https://blog.img.com.br/wp-content/uploads/2018/02/avatar-1577909_640.png'
        }}
        style={{ width: 100, height: 100 }}
      />
      <TouchableOpacity onPress={imagePickerCall} style={{
        backgroundColor: 'red',
        width: 100,
        padding: 30,
        alignContent: 'center',
        marginLeft: 100,
        marginBottom: 20
      }}>
        <Text>Escolher Imagem</Text>
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