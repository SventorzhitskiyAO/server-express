const Users = require('../models/users.model')

class JSONUsersServices {
    addUser = async ({...u}) => {
       return  Users.create({
            name: u.name,
            role: 'admin',
            login: u.login,
            password: u.password
       });
    }

    getAllUsers = async () => {
        return Users.findAll({raw: false });
    }

    deleteUser = id => {
        return Users.destroy({where: {id: id}});
    }

    changeUser = async (id, body) => {
        return Users.update({...body}, {where: {id: id} })
    }

    searchUserLogin = async (login) => {
        return Users.findOne({where: {login: login}, raw: true});
    }
}


module.exports = new JSONUsersServices();