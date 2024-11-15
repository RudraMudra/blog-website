"use client"

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const handleSignInWithGoogle = async () => {
        setIsLoading(true);
        try{
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch(error) {
            setError(error?.message);
        }
        setIsLoading(false);
    }

    const handlelogout = async () => {
        setIsLoading(true);
        try{
            await signOut(auth);
        } catch(error) {
            setError(error?.message);
        }
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider value={{ 
            user,  
            isloading, 
            error,
            handleSignInWithGoogle,
            handlelogout
         }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);