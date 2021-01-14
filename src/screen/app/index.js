import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Lock from './Lock';
import Control from './Control';
import Debug from './Debug';
const Stack = createStackNavigator();

function App() {
    return (
        <Stack.Navigator initialRouteName={'lock'} headerMode="none">
            <Stack.Screen name="lock" component={Lock} />
            <Stack.Screen name="control" component={Control} />
            <Stack.Screen name="debug" component={Debug} />
        </Stack.Navigator>
    )
}

export default App;
