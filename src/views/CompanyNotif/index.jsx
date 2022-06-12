import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, TextInput } from 'react-native';
import { styles } from './styles';
import { Divider } from 'react-native-elements';
import notifi from '../../assets/notifi';
import { Entypo } from '@expo/vector-icons';

export default function CompanyNotif() {



  function getNotifications({ item }) {
    return (
      <>
        <TouchableOpacity style={styles.content} onPress={() =>{}}>
        <Entypo name={item.icon} size={32} color={'#5f5f63'} style={{
                    marginLeft: 8,marginRight: 12,marginTop:8
                }} />
          <View style={styles.vacancyContent}>
            <Text  style={styles.vacancyCompany}>{item.user} - {item.action}</Text>
            <Text style={styles.vacancyDate}>Data: {item.data}</Text>
          </View>
        </TouchableOpacity>
        <Divider width={1} color='#DCDCDC' />
      </>
    );
  }

  return (
    <>
      <FlatList
        style={styles.container}
        keyExtractor={() => Math.random()}
        data={notifi}
        renderItem={getNotifications}
      />
    </>
  );
}