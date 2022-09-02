import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFilms } from '../features/films/filmsSlice'
import { filmType } from '../types/films'

type RootStackParamList = {
  Home: { list: { itemId: number; title: string }[] }
  Details: { itemId: number }
}

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export function HomeScreen({ route, navigation }: HomeProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFilms())
  }, [])
  const filmsList: filmType[] = useSelector(state => state.films?.list)

  return (
    <View style={styles.container}>
      <Text>App for managing family films</Text>
      {/* <StatusBar style="auto" /> */}
      {route.params.list.map(film => (
        <Text key={film.itemId}>{film.title}</Text>
      ))}
      {filmsList?.map(film => (
        <Text key={film.id}>{film.title}</Text>
      ))}
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.push('Details', { itemId: Math.floor(Math.random() * 10) })
        }
      />
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
