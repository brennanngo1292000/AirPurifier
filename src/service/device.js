import MqttConnection from "./mqtt_connection";
import Listener from './listeners/device_listener';

export default class Device extends MqttConnection {
  constructor(_class, uri) {
    super(_class, uri, "devices");
    this._class   = _class;
    this.uri      = uri;

    Listener.get_devices( this, this.get_client() , this.topic, this.qos);
    this.publish(this.topic, "list-devices")
  }

  disconnect() {
    Listener.disconnect();
  }

  set_device_client(device_info) {
    this._class.add_device_client( device_info );
  }
}
