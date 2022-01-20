import { React } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import {styles} from './styles'
import AboutUser from '../../components/studentComponents/AboutUser';
import UserDescription from '../../components/studentComponents/UserDescription';
import UserFormation from '../../components/studentComponents/UserFormation';

export default function Perfil() {
    return(
       <ScrollView>
           <AboutUser/>
           <Divider width={3} color='#DCDCDC'/>
           <UserDescription/>
           <Divider width={3} color='#DCDCDC'/>
           <UserFormation/>
       </ScrollView>
    );
}