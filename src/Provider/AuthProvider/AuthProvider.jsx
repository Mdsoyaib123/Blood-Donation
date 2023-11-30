import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../../Config/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const GoogleProvider  = new GoogleAuthProvider();
   


    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogin = ()=>{
        return signInWithPopup( auth,GoogleProvider)
    }
    const logOut= ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name,photoUrl) =>{
       return updateProfile(auth.currentUser, {
            displayName:name, photoURL: photoUrl
          })   
    }

    useEffect(()=>{
        const unSubsCribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
            if(currentUser){
                const loggedUser = {email:currentUser.email}
                axios.post('https://blood-donation-server-one.vercel.app/jwt',loggedUser,{withCredentials:true})
                .then(res=>{
                    console.log('token response',res.data);
                })
            }
          
        })
        return ()=>{
            return unSubsCribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut,
        googleLogin,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;