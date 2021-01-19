const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

class User {
    constructor(id, name, login, password) {
        this.id = id;
        this.name = name;
        this.role = 'user';
        this.login = login;
        this.password = password;
    }
}

class JSONUsersServices {
    readFile = () => {
        return  JSON.parse(fs.readFileSync('users.json', 'utf8'));
    }

    users = this.readFile()

    addUser = ({name, login, password}) => {
        if (this.searchUserLogin(login) !== -1) return 'Choose another login';

        let user = new User(new Date().getTime(), name, login, this.createHashPassword(password));
        this.users.push(user);
        this.writeFileJSON();
        return JSON.stringify(this.users);

    }

    getAllUsers = () => {
        return JSON.stringify(this.users);
    }

    deleteUser = id => {
        let userIndex = this.searchUserIndex(id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            this.writeFileJSON();
        }

        return JSON.stringify(this.users);
    }

    changeUser = (id, body) => {
        const userIndex = this.searchUserIndex(id);

        if (body.hasOwnProperty('login')) this.users[userIndex].login = body.login;
        if (body.hasOwnProperty('password')) this.users[userIndex].password = this.createHashPassword(body.password);
        if (body.hasOwnProperty('name')) this.users[userIndex].name = body.name;

        this.writeFileJSON();
        return JSON.stringify(this.users);
    }

    getUserByLoginAndPassword = (login, password) => {
        let index =  this.searchUserLogin(login);

        if (index === -1) return 'not correct login or password';
        if (this.createHashPassword(password) === this.users[index].password) return this.users[index];

        return 'not correct login or password';
    }

    searchUserIndex = (id) => {
        return this.users.findIndex(element => element.id === +id);
    }

    searchUserLogin = (login) => {
        return this.users.findIndex(element => element.login === login);
    }

    createHashPassword = (passwordFromUser) => {
        let salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(passwordFromUser, salt);
    }

    writeFileJSON()  {
        fs.writeFile('users.json', JSON.stringify(this.users), (err) => {
            if (err) throw err;
        });
    }
}

module.exports = new JSONUsersServices();
