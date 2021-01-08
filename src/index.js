import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './screen/app'
import StoreApp from './Context';
import MQTT from './lib/mqtt'
import { log } from './lib/debug';
import { isObject, isString } from 'underscore';
import FlashMessage from './component/FlashMessage'
import { showFlashMessage } from './util';


// sub topic :

// tele/92/36/air_purifier/LWT
// msg: Online/ Offline

// stat/92/36/air_purifier/power
// msg: 
// Bật máy: 
// Tắt máy: {"power": 0, "by": "...."}

// stat/92/36/air_purifier/mode
// msg: 
// Manual: 
// Auto: {"mode": 0, "by": "...."}

// stat/92/36/air_purifier/speed
// Msg: 
// Tốc độ 1: {"speed": 1, "by": "...."}
// Tốc độ 2: {"speed": 2, "by": "...."}
// Tốc độ 3: {"speed": 3, "by": "...."}

// stat/92/36/air_purifier/pm2.5
// {"pm2.5": 1, "time": time_unix}

// stat/92/36/air_purifier/pm1.0
// {"pm1.0": 1, "time": time_unix}

// stat/92/36/air_purifier/pm100
// {"pm100": 1, "time": time_unix}

 //pub topic cmnd/.../..../power
// cmnd/.../.../mode
// cmnd/..../..../speed
//like msg  + "by": "ap_co"

const SingletonClient = (function() {
    var instance;
    async function createClient() {
      const client = await MQTT.createClient({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: "airpurifier" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
      });
      return client;
    }
  
    return {
      getClient: async function() {
        if (!instance) {
          instance = await createClient();
        }
        return instance;
      },
    };
})();

export default function () {
    const [mode, setMode] = useState({mode: 1});
    const [power, setPower] = useState({power: 0});
    const [speed, setSpeed] = useState({speed: 1});
    const [lwt, setLWT] = useState('Offline');
    const [pm25, setpm25] = useState({"pm2.5": '', "time":''})
    const [pm10, setpm10] = useState({"pm1.0": '', "time":''})
    const [pm100, setpm100] = useState({"pm100": '', "time":''})
    const [isConnect, setIsConnect] = useState(true);
    async function connect(){
       let client = await SingletonClient.getClient()
       client.on('closed', function() {
        log('client closed')
        setIsConnect(false);
      });
      client.on('error', function(msg) {
        log('error', msg)
        setIsConnect(false);
      });
    
      client.on('message', function(msg) {
        log('mqtt.event.message', msg);
        onMessage(msg);
      });
      client.on('connect', function() {
        log('client connected');
        setIsConnect(true);
        client.subscribe('tele/92/36/air_purifier/LWT', 0);
        client.subscribe('stat/92/36/air_purifier/power', 0);
        client.subscribe('stat/92/36/air_purifier/mode', 0);
        client.subscribe('stat/92/36/air_purifier/speed', 0);
        client.subscribe('stat/92/36/air_purifier/pm2.5', 0);
        client.subscribe('stat/92/36/air_purifier/pm1.0', 0);
        client.subscribe('stat/92/36/air_purifier/pm100', 0);
        client.subscribe('stat/92/36/air_purifier/speed', 0);
        log(client);
      });
      client.connect();
    }
    function onMessage ({data, topic}) {
        try{
            if(data == null || data == undefined) return;
            log('______________data'+ data + topic);
            let res = JSON.parse(data.toString())
            switch(topic){
                case 'tele/92/36/air_purifier/LWT':
                    return setLWT(res);
                case 'stat/92/36/air_purifier/power':
                    return setPower(res)
                case 'stat/92/36/air_purifier/mode':
                    return setMode(res)
                case'stat/92/36/air_purifier/speed':
                    return setSpeed(res)
               case 'stat/92/36/air_purifier/pm2.5':
                    return setpm25(res)
               case 'stat/92/36/air_purifier/pm1.0':
                    return setpm10(res)
               case 'stat/92/36/air_purifier/pm100':
                    return setpm100(res)
               case 'stat/92/36/air_purifier/speed':
                    return setSpeed(res)
                default:
                    return;
            }
        }catch(error){
            log(error.message)
        }
        
    }
    async function publish(topic, data) {
        try{
            let client = await SingletonClient.getClient();
            let newData = isObject(data) ? JSON.stringify({...data, by: "ap_co"}):  data;
            log('data sent ' + newData);
            client.publish(topic, newData, 0, false) 
        }catch(error){
            log(error.message)
        }
        
    }
    async function onMode (value) {
        showFlashMessage('info', 'Mode', `You have been sent the mode: {mode:${value}} to topic: cmnd/92/36/air_purifier/mode`)
        return publish('cmnd/92/36/air_purifier/mode', {mode:value});
    }
    async function onSpeed (value) {
        showFlashMessage('info', 'Speed', `You have been sent the speeder: {speed:${value}} to topic: cmnd/92/36/air_purifier/speed`)
        return publish('cmnd/92/36/air_purifier/speed', {speed:value});
    }
    async function onPower (value) {
        showFlashMessage('info', 'Power', `You have been sent the poewer: {power:${value}} to topic: cmnd/92/36/air_purifier/power`)
        return publish('cmnd/92/36/air_purifier/power', {power:value});
    }

    const init = {
        mode,
        speed,
        pm25,
        pm100, 
        pm10,
        power,
        lwt,
        isConnect,
        onMode,
        onSpeed,
        onPower,
    }

    useEffect(()=>{
        let isActive = true;
        if(isActive) connect();
       return ()=>{
           isActive = false;
           if(client) client.disconnect();
       }
    }, [])
 
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StoreApp.Provider  store={StoreApp} value={init}>
                    <App />
                </StoreApp.Provider>
            </NavigationContainer>
            <FlashMessage ref={(ref) => FlashMessage.setRef(ref)} />
        </SafeAreaProvider>
    );
}
