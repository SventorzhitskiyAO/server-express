const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

userScheme = new mongoose.Schema({
    name: String,
    role: String,
    login: String,
    password: {
        type: String,
        set: value => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    }
}, {versionKey: false});

mongoose.model("User", userScheme);

