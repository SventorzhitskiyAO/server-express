const Sequelize = require("sequelize");
const sequelize = require('../services/dbConnect')
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
        }
    }
});

module.exports = User;