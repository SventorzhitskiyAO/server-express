const Joi = require('joi');

const updateUsersSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),
})
    .with('password', 'repeat_password')

module.exports = updateUsersSchema;