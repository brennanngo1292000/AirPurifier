import _ from 'underscore';
import { log } from '../../../lib/debug';

module.exports = {
    lwt(_class, mqttClient, channel, qos) {
        if (!mqttClient) {
            return;
        }
        this.onConnect = this.onConnect.bind(this);
        this.onClosed = this.onClosed.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.disconnect = this.disconnect.bind(this);

        this.config = _.extend({
            channel: channel,
            qos: qos,
            _class: _class,
        });

        mqttClient.then((client) => {
            this.client = client;
            client.on('closed', this.onClosed);
            client.on('error', this.onError);
            client.on('message', this.onMessage);
            client.on('connect', this.onConnect);
            client.connect();
        }).catch();

    },
    disconnect() {
        if (this.client) {
            log('client disconnected')
        }
    },
    onError(error) {
        log('error', error.message)
    },
    onConnect() {
        if (this.config.channel != null) {
            this.client.subscribe(this.config.channel, this.config.qos);
            log('lwt sub', this.config.channel, this.config.qos)
        }
    },
    onClosed(err) {
        log('close', error.message)
    },
    onMessage(msg) {
        var topic = msg.topic;
        var data = msg.data;

        let lwt = JSON.parse(data);
        this.config._class.set_lwt(lwt);
    },
};
