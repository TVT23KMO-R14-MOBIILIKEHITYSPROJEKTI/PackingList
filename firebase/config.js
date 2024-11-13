import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore'
import { firebaseConfig } from '../apikeys'
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

// tarkistetaan, että firebaseConfig on määritelty ja sisältää apikeyn
if (firebaseConfig === undefined) {
    throw new Error('firebaseConfig is not defined')
}
if (firebaseConfig.apiKey === undefined || firebaseConfig.apiKey === '') {
    throw new Error('firebaseConfig.apiKey is not defined or empty')
}

const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app)

//Firebase autentikaatio ja AsyncStorageen tallennettu kirjautuminen
//const auth = getAuth()
const auth = initializeAuth(app, { persistence: getReactNativePersistence() })


const PACKINGITEMS = 'packingitems'

export { 
    firestore,
    collection, 
    addDoc,
    serverTimestamp, 
    query,
    onSnapshot,
    orderBy,
    PACKINGITEMS,
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
}
