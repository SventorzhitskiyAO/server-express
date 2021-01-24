const jwt = require('jsonwebtoken');
const usersServices = require('../services/users.services');

const services = usersServices;

const auth = (role) => async (req, res, next) => {
    try {
        const [strategy, token] = req.header('Authorization').split(' ');
        req.login = jwt.verify(token, 'secret');

        const user = await services.searchUserLogin(req.login);

        if (user.role !== role) res.status(403).send('Forbidden');
        next();
    }catch (e) {
        res.status('401').send(e.message);
    }
}

module.exports = auth;