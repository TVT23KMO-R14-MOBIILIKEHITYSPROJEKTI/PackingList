import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase/config'
import { View, Text } from 'react-native'
import createUser from './CreateUser'

const CheckCredentials = ({ setLogged }) => {
    const [loadingMessage, setLoadingMessage] = React.useState('Checking credentials')

    useEffect(() => {
        const checkCredentials = async () => {
            console.log('Checking credentials')
            let email = await AsyncStorage.getItem('userEmail')
            let password = await AsyncStorage.getItem('userPassword')
            console.log('email:', email)
            console.log('password:', password)
            if (!email || !password) {
                console.log('Creating new user')
                const result = await createUser(setLoadingMessage)
                if (result) {
                    setLogged(true)
                }
            } else {
                console.log('Signing in')
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => setLogged(true))
                    .catch(async error => {
                        console.log('Error signing in:', error)
                        if (error.code === 'auth/invalid-credential') {
                            await AsyncStorage.removeItem('userEmail')
                            await AsyncStorage.removeItem('userPassword')
                            const result = await createUser(setLoadingMessage)
                            if (result) {
                                setLogged(true)
                            }
                        }
                    })
            }
        }
        checkCredentials()
    }, [setLogged])

    return (
        <View>
            <Text>{loadingMessage}</Text>
        </View>
    )
}

export default CheckCredentials
