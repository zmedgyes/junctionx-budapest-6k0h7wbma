module.exports = class UserController {
    static get $inject() { return ['userService']; }
    constructor(userService) {
        this.userService = userService;
    }

    async addUser(req, res, next) {
        const { email, password } = req.body;
        try {
            const existingUser = await this.userService.getUserByEmail(email);
            if(existingUser) {
                res.status(400).send('user already exists');
                return;
            }
            await this.userService.addUser(email, password);
            const newUser = await this.userService.getUserByEmail(email);
            res.json(newUser);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        const { user_id } = req.body;
        try {
            await this.userService.deleteUser(user_id);
            res.json({ success: true})
        } catch (err) {
            next(err);
        }
    }

    async listUsers(req, res, next) {
        try {
            const users = await this.userService.listUsers();
            res.json(users)
        } catch (err) {
            next(err);
        }
    }
};