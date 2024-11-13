import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import styles from './styles/Styles'
import FetchItems from './components/FetchItems'
import SaveItem from './components/SaveItem'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CheckCredentials from './components/CheckCredentials'

export default function App() {
  const [logged, setLogged] = useState(false)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {logged ? (
          <>
            <Text style={styles.title}>Packing List</Text>
            <SaveItem />
            <FetchItems />
            <StatusBar style="auto" />
          </>
        ) : (
          <CheckCredentials setLogged={setLogged} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
