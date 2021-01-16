const fs = require('fs');

let users;

fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) throw err;
    users = JSON.parse(data);
});

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class JSONUsersServices {
    addUser = (name) => {
        let user = new User(new Date().getTime(), name);
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

    searchUserIndex = (id) => {
        return users.findIndex(element => element.id === +id);
    }

    writeFileJSON()  {
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            console.log(err)
        });
    }
}

module.exports = new JSONUsersServices();