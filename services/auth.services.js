const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

let users;

fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) throw err;
    users = JSON.parse(data);
});

class AuthServices {
    signIn = (login, password) => {
        const user = users[this.searchUserLogin(login)];

        if (bcrypt.compareSync(password, user.password)) {
            user.token = jwt.sign(user.login.toString(), 'secret');

            return user;
        }
    }

    searchUserLogin = (login) => {
        return users.findIndex(element => element.login === login);
    }
}

module.exports = new AuthServices();