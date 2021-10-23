module.exports = class UserController {
    static get $inject() { return ['userService']; }
    constructor(userService) {
        this.userService = userService;
    }

    async addUser(req, res, next) {
        const { email, password } = req.body;
        const existingUser = await this.userService.getUserInfoByEmail(email);
        if (existingUser) {
            res.status(400).send('user already exists');
            return;
        }
        await this.userService.addUser(email, password);
        const newUser = await this.userService.getUserInfoByEmail(email);
        res.json(newUser);
    }

    async deleteUser(req, res, next) {
        const { user_id } = req.body;
        await this.userService.deleteUser(user_id);
        res.json({ success: true })
    }

    async listUsers(req, res, next) {
        const users = await this.userService.listUsers();
        res.json(users)
    }

    async getUserInfo(req, res, next) {
        const { user_id } = req.body;
        const user = await this.userService.getUserInfoById(user_id);
        res.json(user)
    }

    async getPoints(req, res, next) {
        const { user_id } = req.body;
        const points = await this.userService.getPointsByUserId(user_id);
        res.json({points})
    }
};