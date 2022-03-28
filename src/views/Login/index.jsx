import React, { useState, useEffect, useContext, useRef } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, TextInput, Text, View, Image, StatusBar, Animated,ToastAndroid } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize'


import { AuthContext } from '../../contexts/auth';


export default function LoginScreen({ navigation }) {
    const modalizeRef = useRef(null);
    function onOpen(){
        modalizeRef.current?.open();
    }

    const { signIn, signInCompany } = useContext(AuthContext);

    const [email, setEmail] = useState(initialState = null);
    const [password, setPassword] = useState(initialState = null);
    async function Login() {
        signIn(email, password)

    }

    async function LoginCompany() {
        signInCompany(email, password)

    }

    //UseState pra animações
    const [offset, setOffset] = useState(new Animated.ValueXY({ x: 0, y: 80 }))
    //UseEffect que vai realizar a animação quando o componente for renderizado
    useEffect(() => {
        Animated.spring(offset.y, {
            toValue: 0,
            speed: 3,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar backgroundColor={'#5155b4'} />
            <View style={styles.containerLogo}>
                <Image
                    source={require("../../assets/img/icons/icon_v1.png")}
                    style={styles.logo}
                />
                <Text style={styles.titleLogo}>Lens - Estágios</Text>
            </View>
            <Animated.View style={[styles.containerForm,
            {
                transform: [
                    { translateY: offset.y }
                ]
            }
            ]}>
                <Text style={styles.helloText}>Acesse e encontre seu primeiro emprego!</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    autoCorrect={false}
                    secureTextEntry
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setPassword(text) }}
                />
                <TouchableOpacity style={styles.loginButton}
                    onPress={() => { Login() }}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate('Cadastro')}>
                    <Text>Cadastre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.companyButton} onPress={onOpen}>
                    <MaterialIcons name='domain' size={18} />
                    <Text style={styles.companyLink}>Acessar como empresa</Text>
                </TouchableOpacity>

            </Animated.View>

            <Modalize
                ref={modalizeRef}
                snapPoint={485}
            >
                <KeyboardAvoidingView style={styles.containerFormModal}>
                    <Text style={ styles.helloTextModal}>Acesse e Encontre seu Estagiário!</Text>

                    <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    autoCorrect={false}
                    secureTextEntry
                    selectionColor={'#5155b4'}
                    onChangeText={(text) => { setPassword(text) }}
                />

                    <TouchableOpacity style={styles.loginButtonCompany}
                    onPress={() => { LoginCompany()}}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>

                </KeyboardAvoidingView>
            </Modalize>

        </KeyboardAvoidingView>

    );
}