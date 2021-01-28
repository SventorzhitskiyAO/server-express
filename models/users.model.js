const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

userScheme = new mongoose.Schema({
    name: String,
    role: String,
    login: String,
    password: {
        type: String,
        set: value => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    },
    img: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: String
    }
}, {versionKey: false});

mongoose.model("User", userScheme);
