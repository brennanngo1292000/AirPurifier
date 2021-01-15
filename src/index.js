import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './screen/app';
import StoreApp from './Context';
import MQTT from './lib/mqtt';
import {log} from './lib/debug';
import {has, isObject} from 'underscore';
import FlashMessage from './component/FlashMessage';
import {showFlashMessage} from './util';
import {Vibration} from 'react-native';
import {useRef} from 'react';

const SingletonClient = (function () {
  var instance;
  async function createClient() {
    const client = await MQTT.createClient({
      uri: 'mqtt://broker.hivemq.com:1883',
      clientId:
        'airpurifier' +
        (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1),
    });
    return client;
  }

  return {
    getClient: async function () {
      if (!instance) {
        instance = await createClient();
      }
      return instance;
    },
  };
})();

export function vibrate() {
  Vibration.vibrate();
}

export default function () {
  const numPress = useRef(0);
  const [mode, setMode] = useState(0);
  const [power, setPower] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [lwt, setLWT] = useState(false);
  const [pm25, setpm25] = useState('');
  const [isConnect, setIsConnect] = useState(true);
  const [isDebug, setIsDebug] = useState(false);
  const [debugData, setDebugData] = useState('');
  const [currentDebug, setCurrentDebug] = useState('');
  async function connect() {
    let client = await SingletonClient.getClient();
    client.on('closed', function () {
      log('client closed');
      setIsConnect(false);
    });
    client.on('error', function (msg) {
      log('error', msg);
      setIsConnect(false);
    });

    client.on('message', function (msg) {
      log('mqtt.event.message', msg);
      onMessage(msg);
    });
    client.on('connect', function () {
      log('client connected');
      setIsConnect(true);
      client.subscribe('tele/92/36/air_purifier/LWT', 0);
      client.subscribe('stat/92/36/air_purifier/power', 0);
      client.subscribe('stat/92/36/air_purifier/mode', 0);
      client.subscribe('stat/92/36/air_purifier/speed', 0);
      client.subscribe('stat/92/36/air_purifier/pm2.5', 0);
    });
    client.connect();
  }
  function onMessage({data, topic}) {
    try {
      if (data == null || data == undefined) return;
      let res =
        topic == 'tele/92/36/air_purifier/LWT'
          ? data
          : JSON.parse(data.toString());
          setCurrentDebug(`${new Date() .toTimeString()}: onMessage from topic ${topic} with payload ${data}`)
      switch (topic) {
        case 'tele/92/36/air_purifier/LWT':
          return setLWT(res == 'Online');
        case 'stat/92/36/air_purifier/power':
          if (has(res, 'power'))
            return setPower(res['power']);
        case 'stat/92/36/air_purifier/mode':
          if (has(res, 'mode'))
            return setMode(res['mode']);
        case 'stat/92/36/air_purifier/speed':
          if (has(res, 'speed'))
            return setSpeed(res['speed']);
        case 'stat/92/36/air_purifier/pm2.5':
          if (has(res, 'pm2.5'))
            return setpm25(res['pm2.5']);
        default:
          return;
      }
    } catch (error) {
      log(error.message);
    }
  }

  async function publish(topic, data) {
    try {
      let client = await SingletonClient.getClient();
      let newData = isObject(data)
        ? JSON.stringify({...data, by: 'ap_co'})
        : data;
        setCurrentDebug(`${new Date() .toTimeString()}: publish to topic ${topic} with payload  ${newData}\n\n${debugData}\n`);
      log('data sent ' + newData);
      client.publish(topic, newData, 0, false);
    } catch (error) {
      log(error.message);
    }
  }
  function isSent(lwt, power) {
    if (!lwt) {
      showFlashMessage('error', 'FAIL', 'The device is offline!');
      return false;
    } else if (power != 1) {
      showFlashMessage('error', 'FAIL', 'The device is off!');
      return false;
    }
    return true;
  }
  async function onMode(value) {
    let is = await isSent(lwt, power);
    if (is) {
      isDebug &&
        showFlashMessage(
          'info',
          'MODE',
          `You have been sent the mode: {mode:${value}} to topic: cmnd/92/36/air_purifier/mode`,
        );
      vibrate();
      return publish('cmnd/92/36/air_purifier/mode', {mode: value});
    }
  }
  async function onSpeed(value) {
    let is = await isSent(lwt, power);
    if (is) {
      isDebug &&
        showFlashMessage(
          'info',
          'SPEED',
          `You have been sent the speeder: {speed:${value}} to topic: cmnd/92/36/air_purifier/speed`,
        );
      vibrate();
      return publish('cmnd/92/36/air_purifier/speed', {speed: value});
    }
  }
  async function onPower(value) {
    let is = await isSent(lwt, 1);
    if (is) {
      isDebug &&
        showFlashMessage(
          'info',
          'POWER',
          `You have been sent the power: {power:${value}} to topic: cmnd/92/36/air_purifier/power`,
        );
      vibrate();
      return publish('cmnd/92/36/air_purifier/power', {power: value});
    }
  }

  function turnOnDebug() {
    numPress.current = numPress.current + 1;
    if (numPress.current == 7) {
      setIsDebug(true);
      showFlashMessage('success', 'DEBUG', `You are in the debug mode!`);
    }
  }

  const init = {
    mode,
    speed,
    pm25,
    power,
    lwt,
    isConnect,
    onMode,
    onSpeed,
    onPower,
    isDebug,
    debugData,
    turnOnDebug,
  };

  useEffect(() => {
    let isActive = true;
    if (isActive) connect();
    return () => {
      isActive = false;
      if (client) client.disconnect();
    };
  }, []);

  useEffect(()=>{
   if(currentDebug) setDebugData( `${currentDebug}\n\n${debugData}\n`);
  }, [currentDebug])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StoreApp.Provider store={StoreApp} value={init}>
          <App />
        </StoreApp.Provider>
      </NavigationContainer>
      <FlashMessage ref={(ref) => FlashMessage.setRef(ref)} />
    </SafeAreaProvider>
  );
}
