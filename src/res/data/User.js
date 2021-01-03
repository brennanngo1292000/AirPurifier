import Storage from './Storage';

class User {
    #data;
    constructor() {
        this.load_data();
    }
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

let user = new User();

export function getUserInfo() {
    return user.get_data();
}

export async function setUserInfo(first_name, surname) {
    return user.set_data(first_name, surname)
}