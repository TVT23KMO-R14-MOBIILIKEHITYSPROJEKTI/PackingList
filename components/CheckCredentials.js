import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase/config'
import { View, Text } from 'react-native'
import createUser from './CreateUser'

const CheckCredentials = ({ setLogged }) => {
    const [loadingMessage, setLoadingMessage] = useState('Checking credentials')

    useEffect(() => {
        const checkCredentials = async () => {
            console.log('Checking credentials')
            let email = await AsyncStorage.getItem('userEmail')
            let password = await AsyncStorage.getItem('userPassword')
            console.log('email:', email)
            console.log('password:', password)
            if (!email || !password) {
                console.log('Creating new user, CheckCredentials.js')
                try {
                    const result = await createUser(setLoadingMessage)
                    if (result) {
                        AsyncStorage.getItem('userEmail')
                            .then(email => {
                                AsyncStorage.getItem('userPassword')
                                    .then(password => {
                                        signInWithEmailAndPassword(auth, email, password)
                                            .then(() => setLogged(true))
                                            .catch(error => {
                                                console.log('Error signing in:', error)
                                                setLoadingMessage('Error signing in, create new user')
                                            })
                                    })
                            })
                    }
                } catch (error) {
                    console.error('Error creating user:', error)
                    setLoadingMessage('Error creating user')
                }
            } else {
                console.log('Signing in')
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => setLogged(true))
                    .catch(async error => {
                        console.log('Error signing in:', error.code)
                        if (error.code === 'auth/invalid-credential') {
                            await AsyncStorage.removeItem('userEmail')
                            await AsyncStorage.removeItem('userPassword')
                            try {
                                const result = await createUser(setLoadingMessage)
                                if (result) {
                                    AsyncStorage.getItem('userEmail')
                                        .then(email => {
                                            AsyncStorage.getItem('userPassword')
                                                .then(password => {
                                                    signInWithEmailAndPassword(auth, email, password)
                                                        .then(() => setLogged(true))
                                                        .catch(error => {
                                                            console.log('Error signing in:', error)
                                                            setLoadingMessage('Error signing in, create new user after invalid credentials')
                                                        })
                                                })
                                        })
                                }
                            } catch (error) {
                                console.error('Error creating user:', error)
                                setLoadingMessage('Error creating user')
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
