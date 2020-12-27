import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoComponent from './videostream/VideoComponent';
import VideoScreen from './videostream/VideoScreen';

export class App extends Component {

  render() {
    return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VideoComponent" component={VideoComponent} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

const Stack = createStackNavigator();


export default App
