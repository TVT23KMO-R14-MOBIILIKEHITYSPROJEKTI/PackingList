import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithEmailAndPassword } from '../firebase/config'
import createNewUser from './CreateUser'
import { getAuth } from 'firebase/auth'



const CheckCredentials = async () => {
    let email = await AsyncStorage.getItem('userEmail')
    let password = await AsyncStorage.getItem('userPassword')
    const auth = getAuth()

    if (!email || !password) {
        return await createNewUser()
    } else {
        try {
            console.log('Trying to sign in')
            await signInWithEmailAndPassword(auth, email, password)
            return true
        } catch (error) {
            console.error('Error signing in:', error)
            if (error.code === 'auth/invalid-credential') {
                // poista vialliset kirjautumistiedot
                await AsyncStorage.clear()
                await auth.signOut()
                console.log('Invalid credentials removed')

                return false
            }
            console.log('Error signing in:', error)
            return false
        }
    }
}

export default CheckCredentials
