import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { firestore, PACKINGITEMS } from '../firebase/config'
import { convertFirestoreTimestampToJS } from '../helper/Functions'
import Row from './Row'

export default function FetchItems() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const q = query(collection(firestore, PACKINGITEMS), orderBy('created', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        created: convertFirestoreTimestampToJS(doc.data().created),
      }))
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, PACKINGITEMS, id))
      console.log('deleting')
    } catch (error) {
      console.error("Error deleting document: ", error)
    }
  }


  const toggleComplete = async (id, completed) => {
    try {
      await updateDoc(doc(firestore, PACKINGITEMS, id), {
        completed: !completed,
      })
      console.log('toggling')
    } catch (error) {
      console.error("Error updating document: ", error)
    }
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Row
          {...item}
          deleteItem={() => deleteItem(item.id)}
          toggleComplete={() => toggleComplete(item.id, item.completed)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
