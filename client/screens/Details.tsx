import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import { useDispatch } from 'react-redux'

import { RootStackParamList } from '../../types/films'
import { addFilm } from '../features/films/filmsSlice'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

export function DetailsScreen({
  route,
  navigation,
}: DetailsProps): React.ReactElement {
  const { id, initialTitle } = route.params
  const [title, setTitle] = useState<string>(initialTitle)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert(`Saved ${id}`)} title="Save" />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Button title="⌂" onPress={() => navigation.popToTop()} />
      <Text>App for managing family films</Text>
      <Text>Item No.{id}</Text>
      <StatusBar style="auto" />
      <Button title="Go to List" onPress={() => navigation.navigate('Home')} />
      <TextInput
        multiline
        placeholder="Title of the film"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Done" onPress={() => dispatch(addFilm({ id, title }))} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
