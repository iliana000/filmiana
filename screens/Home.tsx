import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { fetchFilms } from '../features/films/filmsSlice';

type RootStackParamList = {
  Home: { list: Array<{ itemId: number, title: string }> };
  Details: { itemId: number };
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ route, navigation }: HomeProps) {

  useEffect(() => {
    fetchFilms()
  })

  return (
    <View style={styles.container}>
      <Text>App for managing family films</Text>
      {/* <StatusBar style="auto" /> */}
      { route.params.list.map( film => (
        <Text key={film.itemId}>{film.title}</Text>
      ))}
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details', {itemId: Math.floor(Math.random()*10)})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
