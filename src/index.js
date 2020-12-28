import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './screen/app'

export default function () {
  const [power, setPower] = useState(JSON.stringify({power: 0}));
  const [mode, setMode] = useState(JSON.stringify({mode: 0}));
  const [speed, setSpeed] = useState(JSON.stringify({speed: 1}));
  const [status, setStatus] = useState(JSON.stringify({LWT: 'online'}));
  const [AQI, setAQI] = useState(
    JSON.stringify({pm25: 'Đang cập nhật...', quality: 'Đang cập nhật...'}),
  );
  const [temp, setTemp] = useState(
    JSON.stringify({temperature: 'Đang cập nhật...'}),
  );
  //connect mqtt
  const [isConnect, setConnect] = useState(true);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
