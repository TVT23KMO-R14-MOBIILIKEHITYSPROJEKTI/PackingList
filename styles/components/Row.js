import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/Styles'

export default function Row({ name, completed, toggleComplete, deleteItem }) {
  return (
    <Pressable style={styles.row} onPress={toggleComplete}>
      <Text style={[styles.rowText, completed && styles.completedText]}>
        {name}
      </Text>
      <Ionicons name="trash" size={24} onPress={deleteItem} />
    </Pressable>
  )
}

