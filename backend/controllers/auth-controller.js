
const { encryptPassword, USER_ROLES } = require('../misc/auth-util');

module.exports = class AuthController {
    static get $inject() { return ['userService']; }
    constructor(userService) {
        this.userService = userService;
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await this.userService.getUserWithPasswordByEmail(email);
        if(!user) {
            res.status(403).json({ error: 'wrong email' });
            return;
        }

        const passwordHash = encryptPassword(password);
        if (user.password_hash !== passwordHash) {
            res.status(403).json({ error: 'wrong password'});
            return;
        }

        req.session.user = user;
        res.json({ success: true });
    }

    logout(req, res, next) {
        delete req.session.user;
        res.json({ success: true });
    }
}