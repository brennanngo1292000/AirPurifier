class Client {
    _name;
    _topic;
    _macaddress;

    constructor(name, topic, macaddress) {
        this._name = name;
        this._topic = topic;
        this._macaddress = macaddress;
    }

    get_name() {
        return this._name;
    }

    get_topic() {
        return this._topic;
    }

    get_macaddress() {
        return this._macaddress;
    }
}
