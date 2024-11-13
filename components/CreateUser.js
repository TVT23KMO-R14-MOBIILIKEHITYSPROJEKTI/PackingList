import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUserWithEmailAndPassword } from '../firebase/config'
import { auth } from '../firebase/config'

const createNewUser = async () => {
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
        console.log (typeof(auth), typeof(email), typeof(password))
        createUserWithEmailAndPassword(auth, email, password)
        console.log('User created')
        return true
    } catch (error) {
        // virhetilanteenssa poista vialliset kirjautumistiedot (sama käyttäjätunnus?)
        console.error('Error creating user:', error)
        await AsyncStorage.removeItem('userEmail')
        await AsyncStorage.removeItem('userPassword')
        if (error.code === 'auth/email-already-in-use') {
            return createNewUser()
        }
        console.error('Error creating user:', error)
        return false
    }
}

export default createNewUser
