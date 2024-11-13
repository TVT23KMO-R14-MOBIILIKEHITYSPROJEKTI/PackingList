import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import styles from './styles/Styles'
import FetchItems from './components/FetchItems'
import SaveItem from './components/SaveItem'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase/config'
import  CheckCredentials from './components/CheckCredentials'
import CreateUser from './components/CreateUser'

export default function App() {
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const checkCredentials = async () => {
      console.log('Checking credentials')
      const result = await CheckCredentials()
      if (result) {
        console.log('Result:', result)
        setLogged(result)
      } else {
        console.log('Creating user')
        const createUserResult = await CreateUser()
        setLogged(createUserResult)
      }
    }
    checkCredentials()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      {logged ? (
        <>
          <Text style={styles.title}>Packing List</Text>
          <SaveItem />
          <FetchItems />
          <StatusBar style="auto" />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  )
}
