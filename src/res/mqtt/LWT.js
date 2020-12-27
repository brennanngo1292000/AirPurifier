// MQTT
import MqttConnection from "./MqttConnection.js";
import Listener from './listener/lwt_listener.js'

export default class LWT extends MqttConnection {
  constructor(_class, uri, topic) {
    super(_class, uri, topic);

    Listener.lwt( this, this.get_client(), this.topic, this.qos);
  }

  disconnect() {
    Listener.disconnect();
  }

  set_lwt(lwt) {
    this._class.refresh(lwt);
  }
}
