import Storage from './Storage';

class User {
    #data;
    async load_data() {
        this.#data = {
            first_name: await Storage.get_str_entry("first_name"),
            surname: await Storage.get_str_entry("surname"),
        }
    }

    async set_data(first_name, surname) {
        await Storage.set_entry("first_name", first_name);
        await Storage.set_entry("surname", surname);
        await this.load_data();
    }

    get_data() {
        var copy = Object.assign({}, this.#data)
        return copy;
    }
}

export default User;
