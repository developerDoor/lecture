"use strict";

class UserStorage {
    static #users = {
        id : ["문장혁", "강성규", "손유정"],
        psword : ["1234", "5678", "12345678"]
    };

    static getUsers() {
        console.log(this);
        return this.#users;
    }
}

module.exports = UserStorage;