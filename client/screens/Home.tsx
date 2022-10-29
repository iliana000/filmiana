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
import { useQuery } from '@apollo/client'
import { filmsQuery } from '../../server/queries/queries'

import { filmType, RootStackParamList } from '../../types/films'
import { getFilms, removeFilm } from '../features/films/__old__filmsSlice'
import { RootState } from '../store'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: React.FC<HomeProps> = ({ route, navigation }) => {
  const dispatch = useDispatch()
  // with qraphql
  const {loading, error, data} = useQuery(filmsQuery)
  if (data) {
    var filmsList = data.films
		console.log("data: ", filmsList);
	}
 
  // if using redux and api without graphql
  // useEffect(() => {
  //   dispatch(getFilms())
  // }, [])
  // const filmsList: filmType[] = useSelector(
  //   (state: RootState) => state.films?.list,
  // )

  console.log(filmsList?.length);
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>App for managing family films</Text>
      {filmsList?.length && (
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
                    _id: item._id,
                    initialTitle: item.title,
                  })
                }
              />
              <Button
                color="#fa8"
                title="Delete"
                onPress={() => dispatch(removeFilm(item._id))}
              />
            </View>
          )}
          keyExtractor={item => String(item._id)}
        />
      )}
      <Button
        title="Add new"
        onPress={() =>
          navigation.push('Details', {
            _id: Math.floor(Math.random() * 10) + filmsList.length + '',
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
