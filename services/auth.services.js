const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const usersServices = require('../services/users.services');

class AuthServices {

    signIn = (login, password) => {
        return usersServices.searchUserLogin(login).then(user => {
            if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign(user.login.toString(), 'secret');

                return ({user, token});
            }
        })
    }
}

module.exports = new AuthServices();