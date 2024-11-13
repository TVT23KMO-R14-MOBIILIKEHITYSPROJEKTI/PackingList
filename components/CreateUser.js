import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

const createUser = async ({setLoadingMessage}, retry = 0) => {
    // jos rekisteröinti epäonnistuu, yritetään uudelleen
    if (retry > 3) {
        console.error('Too many retries')
        return false
    }
    console.log('Creating new user')
    const email = `jartauri+projekti_${Math.random().toString(36).substring(2)}@gmail.com` // kaksi ensimmäistä randomia merkkiä ovat aina nolla
    const password = Math.random().toString(36).substring(2, 12) // kaksi ekaa pois ja 10 merkkiä salasanaksi
    console.log('email:', email)
    console.log('password:', password)
    await AsyncStorage.setItem('userEmail', email)
    await AsyncStorage.setItem('userPassword', password)
    console.log('täällä ollaan')

    try {
        console.log('Trying to create user')
        createUserWithEmailAndPassword(auth, email, password)
        console.log('User created')
        return true
    } catch (error) {
        // virhetilanteenssa poista vialliset kirjautumistiedot (sama käyttäjätunnus?)
        console.error('Error creating user:', error)
        await AsyncStorage.removeItem('userEmail')
        await AsyncStorage.removeItem('userPassword')
        if (error.code === 'auth/email-already-in-use') {
            return createUser(retry + 1)
        }
        console.error('Error creating user:', error)
        setLoadingMessage('Error creating user')
        return false
    }
}

export default createUser
