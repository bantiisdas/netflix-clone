"use client"

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'


interface AuthProviderProps {
  children: React.ReactNode;
}
interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({children}: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setinitialLoading] = useState(true)
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
    if(user){
      //Loged In
      setUser(user)
      setLoading(false)
    }
    else{
      //Not Logged In
      setUser(null)
      setLoading(true)
      router.push('/login')
    }
    setinitialLoading(false)
   })
  }, [auth])
  

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      router.push('/')
      setLoading(false)
    }).catch((error) => alert(error.message))
    .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      router.push('/')
      setLoading(false)
    }).catch((error) => alert(error.message))
    .finally(() => setLoading(false))
  }

  const logOut = async () => {
    setLoading(true);

    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => alert(error.message))
    .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(() => ({
    
      user, signUp, signIn, logOut, error, loading
      
    }), [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}