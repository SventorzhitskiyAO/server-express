const users = [
    {
        id: 1,
        name: 'Alexander'
    },
    {
        id: 2,
        name: 'Dashka'
    }
];

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class JSONUsersServices {
    addUser = (name) => {
        users.push(new User(users.length + 1, name));
        return JSON.stringify(users);
    }

    getAllUsers = () => {
        return JSON.stringify(users);
    }

    deleteUser = id => {
        users.splice(id - 1, 1);
        users.forEach((item, index) => {
            if(id - 1 === index) {
                item.id = index + 1
            }
        })
        return JSON.stringify(users);
    }

    changeUser = (id, name) => {
        users[id -1].name = name;
        return JSON.stringify(users);
    }
}

module.exports = new JSONUsersServices();