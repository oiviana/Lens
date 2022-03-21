import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function loadStorage(){
            const user = await AsyncStorage.getItem('@Lens:user')
            if(user){
                setUserData(user)
            } 
        } 
        loadStorage()
      }, [])


    async function signIn(email, password) {
        const response = await api.post('/login', {
            email: email,
            password: password
        })
        console.log(response.data)
        if (response.data === "Credenciais incorretas") {
            ToastAndroid.show("Credenciais incorretas", ToastAndroid.LONG)
            return
        }
        else {
      
            setUserData(response.data)
            await AsyncStorage.setItem('@Lens:user', response.data)
        }
    }

    async function signOut(){
        setUserData(null)
        await AsyncStorage.removeItem('@Lens:user');
    }


    return (
        <AuthContext.Provider value={{ nome: "OIOIOI", signIn, signOut, userData }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;