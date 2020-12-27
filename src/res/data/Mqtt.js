class Mqtt {
    #availability_listener;
    #device_listener;

    #is_mqtt_brocker_is_already_checked;
    #is_available;
    #is_data_loaded;

    #data;
    #device_clients;

    constructor() {
        this.#is_mqtt_brocker_is_already_checked = false;
        this.#is_available = false;
        this.#is_data_loaded = false;
    }

    async load_data() {
        this.#data = {
            ipaddress: await Storage.get_str_entry("ipaddress"),
            port: await Storage.get_int_entry("port"),
        }

        this.disconnect();
        this.#device_clients = {
            roomlight: null,
            room_thermometer: null,
        };
    }

    async set_data(ipaddress, port) {
        await Storage.set_entry("ipaddress", ipaddress);
        await Storage.set_entry("port", port);

        await this.load_data();
    }

    get_data() {
        var copy = Object.assign({}, this.#data)
        return copy;
    }

    get_if_mqtt_is_already_checked() {
        return this.#is_mqtt_brocker_is_already_checked;
    }

    get_if_mqtt_is_available() {
        return this.#is_available;
    }

    get_if_data_loaded() {
        return this.#is_data_loaded;
    }

    get_uri() {
        var data = this.get_data();
        return "mqtt://test.mosquitto.org:1883";
    }

    get_devices() {
        var copy = Object.assign({}, this.#device_clients)
        return copy;
    }

    get_roomlight_device() {
        var devices = this.get_devices();
        return devices.roomlight;
    }

    get_room_thermometer_device() {
        var devices = this.get_devices();
        return devices.room_thermometer;
    }

    async init_devices() {
        var uri = this.get_uri();

        if (uri == null) {
            this.#is_mqtt_brocker_is_already_checked = true;
            return;
        }

        // general
        this.#availability_listener = new Availability(this, uri);
    }

    disconnect() {
        if (this.#availability_listener) {
            this.#availability_listener.disconnect();
            this.#availability_listener = null;
        }

        if (this.#device_listener) {
            this.#device_listener.disconnect();
            this.#device_listener = null;
        }

        if (this.#device_clients) {
            var keys = Object.keys(this.#device_clients);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                if (this.#device_clients[keys[i]] != null) {
                    this.#device_clients[keys[i]].disconnect();
                    this.#device_clients[keys[i]] = null;
                }
            }
        }
    }

    async set_mqtt_brocker_to_available() {
        this.#is_mqtt_brocker_is_already_checked = true;
        this.#is_available = true;

        this.#availability_listener.disconnect();
        this.#availability_listener = null;

        this.#device_listener = new Devices(this, this.get_uri());
    }

}

export default Mqtt;