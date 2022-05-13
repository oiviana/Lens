import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Divider } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";
import api from '../../services/api';

export default function EditaPerfil() {

    const [galleryPermission, setGalleryPermission] = useState(null);
    const [img, setImg] = useState(null);


    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })
        console.log(result);

        if(!result.cancelled){
            setImg(result.uri)
        }
        else if(galleryPermission === false){
            return <Text>Sem acesso aos Arquivos</Text>
        }
    }
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => pickImage()}>
                <Text>Selecionar Imagem</Text>
            </TouchableOpacity>
            {img && <Image source={{uri: img}} style={{flex:1/2}}/>}
        </ScrollView>
    );
}