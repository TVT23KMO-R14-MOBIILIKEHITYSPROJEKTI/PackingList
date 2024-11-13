import React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { useState } from 'react'
import styles from '../styles/Styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, signInWithEmailAndPassword } from '../firebase/config'

export default function Login({ setLogged }) {
    const [userName, setUserName] = useState('jarno.tauriainen+packinglistdemo@gmail.com')
    const [password, setPassword] = useState('Testipassu666')

    const login = () => {
        const auth = getAuth()

        signInWithEmailAndPassword(auth, userName, password)
            .then((userCredentials) => {
                console.log('User logged in:', userCredentials.user.uid)
                setLogged(true)
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    console.log('Wrong username or password')
                } else if (error.code == 'auth/too-many-requests') {
                    console.log('Too many attempts, try again later')
                } else {
                    console.log('Error:', error.code, error.message)
                }
            }
            )
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={text => setUserName(text)}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <Button
                    title='Login'
                    onPress={() => login(userName, password)}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
