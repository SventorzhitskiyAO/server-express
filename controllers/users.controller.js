const usersServices = require('../services/users.services');
const path = require('path');

class UsersController {
    services = usersServices;

    get = (req, res) => {
        res.status(200);
        this.services.getAllUsers()
            .then(result => res.send(result))
    }

    getImg = async (req, res) => {
        const userImg = await this.services.searchUserIndex(req.params.id);
        res
            .status(200)
            .header({'Content-Type': 'image/jpeg'} )
            .sendFile(path.dirname(__dirname) + '/' + userImg.img.path)
    }

    add = (req, res) => {
        res
            .status(200)
            .send(this.services.addUser(req.body))
    }

    delete = (req, res) => {
        res.status(200);
        this.services.deleteUser(req.params.id)
            .then(result => res.send(result))
    }

    change = async (req, res) => {
        res
            .status(200)
            .send( await this.services.changeUser(req.params.id, req.body))

    }

    addImg = async (req, res) => {

        console.log(req.file, 123)
        res
            .status(200)
            .send(await  this.services.addImg(req.params.id, req.file))
    }
}

module.exports = new UsersController();
