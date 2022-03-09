import React, {createContext, useState} from 'react';

export const AuthContext = createContext({})

function AuthProvider({children}){
    return(
        <AuthContext.Provider value={{nome: "Vianinhaaaa"}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;