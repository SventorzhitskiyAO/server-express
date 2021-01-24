const usersServices = require('../services/users.services')

class UsersController {
    services = usersServices;

    get = (req, res) => {
        res.status(200);
        this.services.getAllUsers()
            .then(result => res.send(result))
    }

    add = (req, res) => {
        res
            .status(200)
            .send( this.services.addUser(req.body))
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
}

module.exports = new UsersController();