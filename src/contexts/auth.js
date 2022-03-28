import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [userData, setUserData] = useState(null);
    const [company, setCompany] = useState(true);

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
        console.log(response.data)
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

    async function signOut(){
        setUserData(null)
        await AsyncStorage.removeItem('@Lens:user');
        setCompany(false)
    }


    return (
        <AuthContext.Provider value={{ nome: "OIOIOI", signIn, signInCompany, signOut, userData, company }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;