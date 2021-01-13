const usersServices = require('../services/users.services')

class UsersController {
    services = usersServices

    get = (req, res) => {
        res
            .status(200)
            .send(this.services.getAllUsers())
    }

    add = (req, res) => {
        res
            .status(200)
            .send(this.services.addUser(req.body.name))
    }

    delete = (req, res) => {
        res
            .status(200)
            .send(this.services.deleteUser(req.params.id))
    }

    change = (req, res) => {
        res
            .status(200)
            .send(this.services.changeUser(req.params.id, req.body.name))
    }
}

module.exports = new UsersController();