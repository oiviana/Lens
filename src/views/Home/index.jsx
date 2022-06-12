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
  const { signOut, userData } = useAuth()
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

const localUri = data.uri
const fileName = localUri.split('/').pop()

const typematch = /.(\w+)$/.exec(fileName);
  let type = typematch ? `image/${typematch[1]}` : `image`;
  console.log(typematch)
  console.log(fileName)

  setAvatar({
    uri: localUri,
    name: fileName,
    type
  })
  }

  async function uploadImage() {
  
    const imgData = new FormData();
    imgData.append('avatar', {
      ...avatar
    });


console.log("avatar: ",avatar)
    api.post(`uploadImage`, imgData).then(res => {
  }).catch(error => console.log("Erro: " + error))

  }

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle='dark-content' />

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