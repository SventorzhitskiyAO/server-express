const Users = require('../models/users.model')
const bcrypt = require("bcrypt");

class JSONUsersServices {
    addUser = async ({...u}) => {
        console.log(u)
       const user = Users.create({
            name: u.name,
            role: 'admin',
            login: u.login,
            password: u.password
       });
       return user;
    }

    getAllUsers = async () => {
        return Users.findAll({raw: true });
    }

    deleteUser = async id => {
        return Users.destroy({where: {id: id}});
    }

    changeUser = async (id, body) => {
        return Users.update({...body}, {where: {id: id} })
    }

    searchUserIndex = async (id) => {
        return Users.findAll({where: {id: id}, raw: true});
    }
}


module.exports = new JSONUsersServices();