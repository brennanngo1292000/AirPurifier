import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Lock from './Lock';
import Control from './Control';
import Setting from './Setting';
import Profile from './Profile';
import Menu from './Menu';
const Stack = createStackNavigator();

function App() {
    return (
        <Stack.Navigator initialRouteName={'lock'} headerMode="none">
            <Stack.Screen name="lock" component={Lock} />
            <Stack.Screen name="setting" component={Setting} />
            <Stack.Screen name="control" component={Control} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="menu" component={Menu} />
        </Stack.Navigator>
    )
}

export default App;
