import Client from './Client';
import LWT from "../mqtt/LWT";

export class LWTClient extends Client {
    #connection;

    #update_function;

    #lwt;

    constructor(uri, name, topic, macaddress) {
        super(name, topic, macaddress);

        this.#connection = new LWT(this, uri, this._topic["lwt"]);
    }

    disconnect() {
        this.#connection.disconnect();
        this.#connection = null;
    }

    set_lwt(lwt) {
        this.#lwt = lwt;
    }

    refresh(lwt) {
        this.set_lwt(lwt);
        if (this.#update_function != null) {
            this.#update_function();
        }
    }

    register_update_function(update_function) {
        this.#update_function = update_function;
    }

    get_lwt() {
        return this.#lwt == undefined ? "-" : this.#lwt;
    }
}
