const jwt = require('jsonwebtoken');
const fs = require("fs");
const usersServices = require('../services/users.services');

const services = usersServices;
let users = services.readFile();

const auth = (role) => (req, res, next) => {
    try {
        const [strategy, token] = req.header('Authorization').split(' ');
        req.login = jwt.verify(token, 'secret');

        const userIndex = services.searchUserLogin(req.login);

        if (users[userIndex].role !== role) throw new Error('invalid token');

        next();
    }catch (e) {
        res.status('401').send(e.message);
    }
}

module.exports = auth;