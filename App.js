import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import styles from './styles/Styles'
import FetchItems from './components/FetchItems'
import SaveItem from './components/SaveItem'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CheckCredentials from './components/CheckCredentials'
import CreateUser from './components/CreateUser'
import { auth } from './firebase/config'

export default function App() {
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const checkCredentials = async () => {
      //välitetään auth CheckCredentials
      const result = await CheckCredentials(auth)
      if (result) {
        console.log('User logged in, App.js')
        setLogged(true)
      } else {
        const newUser = await CreateUser()
        if (newUser) {
          console.log('New user created, App.js')
          setLogged(true)
          console.log('User logged in after creation, App.js')
        }
      }
    }

    checkCredentials()
  }, [])

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Packing List</Text>
      </SafeAreaView>
  )
}
