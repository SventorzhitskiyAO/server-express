const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');
const createUsers = require('../validation-schemes/createUsers.scheme');
const updateUsers = require('../validation-schemes/updateUser.scheme');

router
    .get('/', controller.get)
    .post('/', validation(createUsers), controller.add)
    .delete('/:id', controller.delete)
    .put('/:id', auth("admin"), validation(updateUsers), controller.change)

module.exports = router;