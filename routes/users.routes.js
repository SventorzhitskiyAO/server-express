const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware')

router
    .get('/', controller.get)
    .post('/', controller.add)
    .delete('/:id', controller.delete)
    .put('/:id', auth("admin"), controller.change)

module.exports = router;