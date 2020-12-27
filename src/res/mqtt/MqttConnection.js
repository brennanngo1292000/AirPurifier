import MQTT from '../../lib/mqtt';

export default class MqttConnection {
  constructor(_class, uri, topic="", qos=0, retained=false) {
    this._class   = _class;
    this.uri      = uri;
    this.topic    = topic;
    this.qos      = qos;
    this.retained = retained;
  }

  get_client() {
    return MQTT.createClient({
      uri: this.uri,
      clientId: "airpurifier" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }

  publish(topic, msg) {
    var {qos, retained} = this
    this.get_client().then(function(client) {
      client.on('connect', function() {
        client.publish(topic, msg, qos, retained);
      });
      client.connect();
    }).catch();
  }
}
