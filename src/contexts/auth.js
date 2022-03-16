import React, { createContext, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../services/api';

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [userData, setUserData] = useState(initialState = null);
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
            ToastAndroid.show(JSON.stringify(userData), ToastAndroid.LONG)
        }
    }


    return (
        <AuthContext.Provider value={{ nome: "OIOIOI", signIn, userData }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;