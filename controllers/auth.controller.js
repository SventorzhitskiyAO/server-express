const authServices = require('../services/auth.services')

class AuthController {
    auth = authServices

    signIn = (req, res) => {
        res
            .status(200)
            .send(this.auth.signIn(req.body.login, req.body.password))
    }
}

module.exports = new AuthController();