import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MQTT from './lib/mqtt';

export default class index extends Component {
    render() {

        /* create mqtt client */
        MQTT.createClient({
            uri: 'mqtt://test.mosquitto.org:1883',
            clientId: 'your_client_id'
        }).then(function (client) {

            client.on('closed', function () {
                console.log('mqtt.event.closed');
            });

            client.on('error', function (msg) {
                console.log('mqtt.event.error', msg);
            });

            client.on('message', function (msg) {
                console.log('mqtt.event.message', msg);
            });

            client.on('connect', function () {
                console.log('connected');
                client.subscribe('/data', 0);
                client.publish('/data', "test", 0, false);
            });

            client.connect();
        }).catch(function (err) {
            console.log(err);
        });
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
