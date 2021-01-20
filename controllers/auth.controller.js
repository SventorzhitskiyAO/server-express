const authServices = require('../services/auth.services')

class AuthController {
    auth = authServices

    signIn = async (req, res) => {
        res
            .status(200)
            .send(await this.auth.signIn(req.body.login, req.body.password))
    }
}

module.exports = new AuthController();