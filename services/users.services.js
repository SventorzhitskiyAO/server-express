const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
let users;

fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) throw err;
    users = JSON.parse(data);
});

class User {
    constructor(id, name, role, login, password) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.login = login;
        this.password = password;
    }
}

class JSONUsersServices {
    addUser = ({name, login, password}) => {
        if (this.searchUserLogin(login) !== -1) return 'Choose another login';

        let user = new User(new Date().getTime(), name, login, this.createHashPassword(password));
        users.push(user);
        this.writeFileJSON();
        return JSON.stringify(users);

    }

    getAllUsers = () => {
        return JSON.stringify(users);
    }

    deleteUser = id => {
        let userIndex = this.searchUserIndex(id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            this.writeFileJSON();
        }

        return JSON.stringify(users);
    }

    changeUser = (id, name) => {
        users[this.searchUserIndex(id)].name = name;
        this.writeFileJSON();
        return JSON.stringify(users);
    }

    getUserByLoginAndPassword = (login, password) => {
        let index =  this.searchUserLogin(login);

        if (index === -1) return 'not correct login or password';
        if (this.createHashPassword(password) === users[index].password) return users[index];

        return 'not correct login or password';
    }

    searchUserIndex = (id) => {
        return users.findIndex(element => element.id === +id);
    }

    searchUserLogin = (login) => {
        return users.findIndex(element => element.login === login);
    }

    createHashPassword = (passwordFromUser) => {
        let salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(passwordFromUser, salt);
    }

    writeFileJSON()  {
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) throw err;
        });
    }
}

module.exports = new JSONUsersServices();