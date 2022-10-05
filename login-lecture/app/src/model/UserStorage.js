"use strict";

class UserStorage {
    static #users = { //데이터 은닉화 #으로 private한 변수를 만든 것
        id: ["nice", "moon", "1016"],
        psword:["0000", "1234", "5678"],
        name: ["문장혁", "서영석", "강성규"],
    }

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;