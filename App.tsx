import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { StyleSheet, Button, Image } from 'react-native'
// import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { DetailsScreen } from './client/screens/Details'
import { HomeScreen } from './client/screens/Home'
import { store } from './client/store'

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    />
  )
}

// const queryClient = new QueryClient()
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: process.env.SERVER + '/graphql',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <ApolloProvider client={client}>
    {/* <QueryClientProvider client={queryClient}> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'List',
                headerTitle: () => <LogoTitle />,
                headerRight: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#000"
                  />
                ),
              }}
              // initialParams={{ list: [{ itemId: 42, title: 'First film' }] }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
    // </QueryClientProvider>
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
