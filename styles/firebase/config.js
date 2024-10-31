import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore'
import { firebaseConfig } from '../apikeys'


//tarkistetaan että firebaseConfig on määritelty ja että siinä on ainakin apiKey

if (firebaseConfig === undefined) {
    throw new Error('firebaseConfig is not defined')
}
if (firebaseConfig.apiKey === undefined || firebaseConfig.apiKey === '') {
    throw new Error('firebaseConfig.apiKey is not defined or empty')
}

initializeApp(firebaseConfig)

const firestore = getFirestore()

const PACKINGITEMS = 'packingitems'

export { 
    firestore,
    collection, 
    addDoc,
    serverTimestamp, 
    query,
    onSnapshot,
    orderBy,
    PACKINGITEMS
}