import React, { createContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [userData, setUserData] = useState(initialState = null);


    async function signIn(email, password) {
        const response = await fetch('http://192.168.1.2:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())

        if (response === "Credenciais incorretas") {
            ToastAndroid.show("Credenciais incorretas", ToastAndroid.LONG)
            return
        }
        else {
            
            setUserData(response)
            ToastAndroid.show(JSON.stringify(userData), ToastAndroid.LONG)
            
        }

    }


    return (
        <AuthContext.Provider value={{ nome: "Vianinhaaaa", signIn, userData }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;