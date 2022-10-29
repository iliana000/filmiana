import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native'
// import { useDispatch } from 'react-redux'

import { RootStackParamList } from '../../types/films'
// import { addFilm } from '../features/films/filmsSlice'
import { addFilmQuery, getFilmQuery } from '../../server/queries/queries'
import { useMutation, useQuery } from '@apollo/client'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

export function DetailsScreen({
  route,
  navigation,
}: DetailsProps): React.ReactElement {
  const { _id } = route.params
  const [title, setTitle] = useState<string>('')
  // const dispatch = useDispatch()
  const {loading, error, data} = useQuery(getFilmQuery, {
    variables: {_id},
    onCompleted: data => setTitle(data.film.title)
  })
  const [addFilm, { data: addFilmData }] = useMutation(addFilmQuery)
  console.log('data', data);
  console.log('addFilmData', addFilmData)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert(`Saved ${_id}`)} title="Save" />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Button title="⌂" onPress={() => navigation.popToTop()} />
      <Text>App for managing family films</Text>
      <Text>Item No.{_id}</Text>
      <StatusBar style="auto" />
      <Button title="Go to List" onPress={() => navigation.navigate('Home')} />
      <TextInput
        multiline
        placeholder="Title of the film"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={title}
        onChangeText={setTitle}
      />
      {data && <FlatList style={styles.tagListContainer}
        data={data.film.tags}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
      />}
      {/* <Button title="Done" onPress={() => dispatch(addFilm({ _id, title }))} /> */}
      <Button title="Done" onPress={() => addFilm({ 
        variables: { title },
        refetchQueries: [{query: getFilmQuery}]  // just to show refetch
        })} />
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
  tagListContainer: {
    flexGrow: 0,
  }
})
