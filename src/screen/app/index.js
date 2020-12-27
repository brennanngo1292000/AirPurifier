import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Lock from './Lock';
import Control from './Control';
const Stack = createStackNavigator();

function App() {
    return (
        <Stack.Navigator initialRouteName={'lock'} headerMode="none">
            <Stack.Screen name="lock" component={Lock} />
            <Stack.Screen name="control" component={Control} />
        </Stack.Navigator>
    )
}

export default App;
