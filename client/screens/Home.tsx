import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  FlatList,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { filmType, RootStackParamList } from '../../types/films'
import { getFilms, removeFilm } from '../features/films/filmsSlice'
import { RootState } from '../store'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: React.FC<HomeProps> = ({ route, navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFilms())
  }, [])
  const filmsList: filmType[] = useSelector(
    (state: RootState) => state.films?.list,
  )

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>App for managing family films</Text>
      {filmsList.length && (
        <FlatList
          data={filmsList}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.film}>
              <Text>{item.title}</Text>
              <Button
                color="#8bf"
                title="Details"
                onPress={() =>
                  navigation.push('Details', {
                    id: item.id,
                    initialTitle: item.title,
                  })
                }
              />
              <Button
                color="#fa8"
                title="Delete"
                onPress={() => dispatch(removeFilm(item.id))}
              />
            </View>
          )}
          keyExtractor={item => String(item.id)}
        />
      )}
      <Button
        title="Add new"
        onPress={() =>
          navigation.push('Details', {
            id: Math.floor(Math.random() * 10) + filmsList.length,
            initialTitle: '',
          })
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
  header: {
    fontSize: 30,
    padding: 30,
  },
  list: {
    flexGrow: 0.5,
  },
  film: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
})
