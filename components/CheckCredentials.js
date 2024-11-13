import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithEmailAndPassword } from '../firebase/config'
import createNewUser from './CreateUser'
import { auth } from '../firebase/config'

const CheckCredentials = async () => {
    console.log('Checking credentials')
    let email = await AsyncStorage.getItem('userEmail')
    let password = await AsyncStorage.getItem('userPassword')

    if (!email || !password) {
        console.log('No credentials found')
        return await createNewUser()
    } else {
        try {
            console.log('Trying to sign in')
            await signInWithEmailAndPassword(auth, email, password)
            return true
        } catch (error) {
            console.log('Error signing in:', error)
            if (error.code === 'auth/invalid-credential') {
                // poista vialliset kirjautumistiedot
                await AsyncStorage.clear()
                //await auth.signOut()
                console.log('Invalid credentials removed')

                return false
            }
            return false
        }
    }
}

export default CheckCredentials
