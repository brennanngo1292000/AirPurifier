import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './screen/app'

export default function () {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
