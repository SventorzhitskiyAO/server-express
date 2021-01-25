const express = require('express');
const multer = require("multer");
const upload = multer({dest:"img/"});
const router = express.Router();

const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');
const createUsers = require('../validation-schemes/createUsers.scheme');
const updateUsers = require('../validation-schemes/updateUser.scheme');

router
    .get('/', controller.get)
    .get('/:id', controller.getImg)
    .post('/',  validation(createUsers), controller.add)
    .delete('/:id', controller.delete)
    .put('/:id', auth("admin"), validation(updateUsers), controller.change)
    .post('/img/:id', upload.single("img"), controller.addImg)

module.exports = router;