const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

class UserNew {
    constructor(name, login, password) {
        this.name = name;
        this.role = 'user';
        this.login = login;
        this.password = password;
    }
}

const userScheme = new Schema(
    {
        name: String,
        role: String,
        login: String,
        password: String
    }
    , {versionKey: false});

const User = mongoose.model("User", userScheme);

// User.createUser(
//     {
//         name: "qwerty",
//         role: "admin",
//         login: "admin",
//         password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10))
//     }
// )

mongoose.connect("mongodb://localhost:27017/", {useNewUrlParser: true}, function (err) {
    if (err) return console.log(err);
});

class JSONUsersServices {
    addUser = ({name, login, password}) => {
        const user = new User(new UserNew(name, login, this.createHashPassword(password)));

        user.save((err) => {
            if (err) return console.log(err);
        });

        return user;
    }

    getAllUsers = async () => {
        return (await User.find({}, (err) => {
            if (err) return console.log(err);
        }))
    }

    deleteUser = async id => {
        return (await User.findByIdAndDelete(id, function (err) {
            if (err) return console.log(err);
        }));
    }

    changeUser = (id, body) => {
        const userChangeProp = {};

        if (body.hasOwnProperty('login')) userChangeProp.login = body.login;
        if (body.hasOwnProperty('password')) userChangeProp.password = this.createHashPassword(body.password);
        if (body.hasOwnProperty('name')) userChangeProp.name = body.name;

        User.findOneAndUpdate({_id: id}, {$set: {userChangeProp}}, {new: true}, function (err) {
            if (err) return console.log(err);
        });
    }

    searchUserIndex = async (id) => {
       return (await User.findById(id, err => console.log(err)));
    }

    searchUserLogin = async (login) => {
        return (await User.findOne({'login': login}, err => console.log(err)));
    }

    createHashPassword = (passwordFromUser) => {
        let salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(passwordFromUser, salt);
    }
}

module.exports = new JSONUsersServices();