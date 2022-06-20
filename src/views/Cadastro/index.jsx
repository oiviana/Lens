import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { AuthContext } from '../../contexts/auth';


export default function Home() {
    const { signUp } = useContext(AuthContext);
    const [nome, setNome] = useState(initialState = null);
    const [rg, setRg] = useState(initialState = null);
    const [cpf, setCpf] = useState(initialState = null);
    const [email, setEmail] = useState(initialState = null);
    const [password, setPassword] = useState(initialState = null);
    const [password2, setPassword2] = useState(initialState = null);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome Completo'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setNome(text) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='RG'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setRg(text) }}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='CPF'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setCpf(text) }}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setEmail(text) }}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setPassword(text) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirme sua senha'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setPassword2(text) }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.sigInButton}
                    onPress={() => { signUp(nome,rg,cpf,email,password,password2)}}>
                    <Text style={styles.textButton}>Cadastre-se</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>

    );
}