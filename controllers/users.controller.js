const usersServices = require('../services/users.services')

class UsersController {
    services = usersServices;

    get = (req, res) => {
        res.status(200);
        this.services.getAllUsers()
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
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
            .catch(err => res.status(500).send(err))
    }

    change = (req, res) => {
        res
            .status(200)
            .send(this.services.changeUser(req.params.id, req.body))
    }
}

module.exports = new UsersController();