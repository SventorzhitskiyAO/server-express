const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
require('../models/users.model');

class UserNew {
    constructor(name, login, password) {
        this.name = name;
        this.role = 'user';
        this.login = login;
        this.password = password;
    }
}

class JSONUsersServices {
    userModel = mongoose.model('User');

    addUser = ({...u}) => {
        const user = new this.userModel(new UserNew(u.name, u.login, u.password));

        user.save();

        return user;
    }

    getAllUsers = async () => {
        return  this.userModel.find({});
    }

    deleteUser = async id => {
        return this.userModel.findByIdAndDelete(id);
    }

    changeUser = async (id, body) => {
        return this.userModel.findOneAndUpdate({_id: id}, {$set: {...body}}, {new: true});
    }

    searchUserIndex = async (id) => {
       return this.userModel.findById(id);
    }

    searchUserLogin = (login) => {
        return this.userModel.findOne({login: "AbsoluteZero"})
    }
}

module.exports = new JSONUsersServices();