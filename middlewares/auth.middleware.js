const jwt = require('jsonwebtoken');
const fs = require("fs");

let users;

fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) throw err;
    users = JSON.parse(data);
});

const auth = (role) => (req, res, next) => {
    try {
        const [strategy, token] = req.header('Authorization').split(' ');
        req.login = jwt.verify(token, 'secret');
        const userIndex = searchUserLogin;

        if (users[userIndex].role !== role || searchUserLogin === -1) throw new Error('invalid token');

        next();
    }catch (e) {
        res.status('401').send(e.message);
    }
}

searchUserLogin = (users, login) => {
    return users.findIndex(element => element.login === login);
}


module.exports = auth;