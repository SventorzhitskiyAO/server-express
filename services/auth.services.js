const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const usersServices = require('../services/users.services');

let users = usersServices.readFile();

class AuthServices {
    services = usersServices

    signIn = (login, password) => {
        const user = users[services.searchUserLogin(login)];

        if (bcrypt.compareSync(password, user.password)) {
            user.token = jwt.sign(user.login.toString(), 'secret');

            return user;
        }
    }
}

module.exports = new AuthServices();