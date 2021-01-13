const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');


router
    .get('/', controller.get)
    .post('/', controller.add)
    .delete('/:id', controller.delete)
    .put('/:id', controller.change)


module.exports = router;