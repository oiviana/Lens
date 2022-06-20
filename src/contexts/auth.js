import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({})
function AuthProvider({ children }) {

    const [userData, setUserData] = useState(null);
    const [company, setCompany] = useState();

    useEffect(() => {
        async function loadStorage() {
            const user = await AsyncStorage.getItem('@Lens:user')
            if (user) {
                setUserData(user)
            }
        }
        loadStorage()
    }, [])


    async function signUp(nome, rg, cpf, email, password, password2) {
        if (password == password2) {
            console.log("passou aqui")
            const response = await api.post('/createEstudante', {
                nome: nome,
                rg: rg,
                cpf: cpf,
                email: email,
                password: password
            })
            console.log("passou aqui 2")
            if (response.data === "erro") {
                ToastAndroid.show("Ocorreu um erro", ToastAndroid.LONG)
            }
            else {
                setCompany(false)
                setUserData(response.data)
                await AsyncStorage.setItem('@Lens:user', JSON.stringify(response.data))

            }
        } else {
            ToastAndroid.show("As senhas não correspondem", ToastAndroid.LONG)

        }
    }

    async function signIn(email, password) {
        const response = await api.post('/login', {
            email: email,
            password: password
        })
        if (response.data === "Credenciais incorretas") {
            ToastAndroid.show("Credenciais incorretas", ToastAndroid.LONG)
            return
        }
        else {
            setCompany(false)
            setUserData(response.data)
            await AsyncStorage.setItem('@Lens:user', JSON.stringify(response.data))
        }
    }
    async function signInCompany(email, password) {
        const response = await api.post('/loginCompany', {
            email: email,
            password: password
        })
        if (response.data === "Credenciais incorretas") {
            ToastAndroid.show("Credenciais incorretas", ToastAndroid.LONG)
            return
        }
        else {

            setUserData(response.data)
            setCompany(true)
            await AsyncStorage.setItem('@Lens:user', JSON.stringify(response.data))

        }
    }

    async function signOut() {
        setUserData(null)
        await AsyncStorage.removeItem('@Lens:user');
        setCompany(false)
    }


    return (
        <AuthContext.Provider value={{ nome: "OIOIOI", signUp, signIn, signInCompany, signOut, userData, company }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;