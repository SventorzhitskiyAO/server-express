const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const usersServices = require('../services/users.services');

class AuthServices {
    signIn = async (login, password) => {
        let user = await usersServices.searchUserLogin(login);
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.login.toString(), 'secret');
            return ({user, token});
        }
    }
}

module.exports = new AuthServices();