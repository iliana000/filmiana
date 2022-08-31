import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useLayoutEffect } from 'react';

type RootStackParamList = {
  Home?: { list: Array<{ itemId: number, title: string }> };
  Details: { itemId: number };
};

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ route, navigation }: DetailsProps) {
  console.log('route', route)
  const [ title, setTitle ] = useState('');
  const { itemId } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert(`Saved ${itemId}`)} title="Save" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="⌂"
        onPress={() => navigation.popToTop()}
      />
      <Text>App for managing family films</Text>
      <Text>Item No.{itemId}</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to List"
        onPress={() => navigation.navigate('Home')}
      />
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.push('Details', {itemId: Math.ceil(Math.random()*10)})}
      />
      <Button
        title="Change Id"
        onPress={() => navigation.setParams({itemId: Math.ceil(Math.random()*10)})}
      /> */}
      <TextInput
        multiline
        placeholder="Title of the film"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={title}
        onChangeText={setTitle}
      />
      <Button
        title="Done"
        onPress={() => {navigation.navigate({
            name: 'Home',
            params: { list: [{ itemId, title }] },
            merge: true,
          });
        }}
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
