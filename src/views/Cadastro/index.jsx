import { React } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {styles} from './styles'

export default function Home() {
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder='Nome'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
            <TextInput
                style={styles.input}
                placeholder='Sobrenome'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
                            <TextInput
                style={styles.input}
                placeholder='RG'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
                            <TextInput
                style={styles.input}
                placeholder='CPF'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
                            <TextInput
                style={styles.input}
                placeholder='Email'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
                            <TextInput
                style={styles.input}
                placeholder='Senha'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
                            <TextInput
                style={styles.input}
                placeholder='Confirme sua senha'
                autoCorrect={false}
                selectionColor={'#5155b4'}
                onChangeText={() => {}}
                />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sigInButton}
                onPress={()=>{sendLogin()}}>
                    <Text  style={styles.textButton}>Cadastre-se</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>

    );
}