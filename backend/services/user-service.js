
const { encryptPassword, USER_ROLES } = require('../misc/auth-util');
const DEFAULT_USER_DATA = { points: 0 };
const DEFAULT_USER_ROLES = [USER_ROLES.USER];

function _parseJSONFields(user) {
    if(!user) {
        return;
    }
    if (user.data) {
        user.data = JSON.parse(user.data);
    }
    if (user.roles) {
        user.roles = JSON.parse(user.roles);
    }
    return user;
}

module.exports = class UserService {
    static get $inject() { return ['db']; }
    constructor(db) {
        this.db = db;
    }
    
    async listUsers() {
        const users = await this.db.query(`SELECT user_id, email, data FROM user`);
        return users.map((user) => _parseJSONFields(user));
    }

    async getUserById(userId) {
        const users = await this.db.query(`SELECT * FROM user WHERE user_id = ?`, [userId]);
        return _parseJSONFields(users[0]);
    }

    async getUserByEmail(email) {
        const users = await this.db.query(`SELECT user_id, email, data FROM user WHERE email = ?`, [email]);
        return _parseJSONFields(users[0]);
    }

    async getUserWithPasswordByEmail(email) {
        const users = await this.db.query(`SELECT * FROM user WHERE email = ?`, [email]);
        return _parseJSONFields(users[0]);
    }

    async addUser(email, password) {
        const passwordHash = encryptPassword(password);
        await this.db.query(`INSERT INTO user (email, password_hash, data, roles) VALUES (?,?,?,?)`, [email, passwordHash, JSON.stringify(DEFAULT_USER_DATA), JSON.stringify(DEFAULT_USER_ROLES)]);
    }

    async updateUserData(userId, data) {
        await this.db.query(`UPDATE user SET data = ? WHERE user_id = ?`, [JSON.stringify(data), userId]);
    }

    async updateUserRoles(userId, roles) {
        await this.db.query(`UPDATE user SET roles = ? WHERE user_id = ?`, [JSON.stringify(roles), userId]);
    }

    async deleteUser(userId) {
        await this.db.query(`DELETE FROM user WHERE user_id = ?`, [userId]);
    }

    async getPointsByUserId(userId) {
        const user = await this.getUserById(userId);
        return (user && user.data.points) || 0;
    }

    async addPointsByUserId(userId, diff = 0) {
        const user = await this.getUserById(userId);
        if(user) {
            const points = (user.data.points || 0) + diff;
            await this.updateUserData(userId, Object.assign(user.data, { points }));
        }
    }

    async getStreakByUserId(userId) {
        const user = await this.getUserById(userId);
        return (user && user.data.streak) || 0;
    }
}