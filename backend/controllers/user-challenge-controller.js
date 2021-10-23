const { CHALLENGE_TYPES } = require("../misc/types");

module.exports = class UserChallengeController {
    static get $inject() { return ['userChallengeService', 'challengeService', 'userService']; };

    constructor(userChallengeService, challengeService, userService) {
        this.userChallengeService = userChallengeService;
        this.challengeService = challengeService;
        this.userService = userService;
    }

    async createUserChallenges(req, res, next) {
        // const user_id = req.session.user.user_id;
        const { user_id, type, config } = req.body;
        await this.userChallengeService.createUserChallenges(user_id, type, config);
        res.json({ success: true });
    }

    async getUserChallengesByUserId(req, res, next) {
        // const user_id = req.session.user.user_id;
        const { user_id } = req.body;
        const userChallenges = await this.userChallengeService.getUserChallengesByUserId(user_id);
        res.json(userChallenges);
    }

    async verifyUserChallenge(req, res, next) {
        const { user_id, type, params } = req.body;
        const  results = await this.userChallengeService.verifyChallenge(user_id, type, params);
        if(results.length > 0) {
            const points = results.reduce((sum, result) => sum + result.points, 0);
            await this._addUserPoints(user_id, points);
            res.json({ success: true, points });
            return;
        }
        res.json({success: false});
    }

    async getTreasureQR(req, res, next) {
        const { id } = req.body;
        const userChallenge = await this.userChallengeService.getUserChallengeById(id);
        if(userChallenge){
            const qr = this.userChallengeService.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
            res.json({ success: true, qr });
        } else {
            res.status(404).json({ success: false, error: 'Attila, ne hívogass faszságogat!' });
        }
    }

    async startRush(req, res, next) {
        const { lat, lng } = req.body;
        const start = new Date().getTime();
        const config = { lat, lng, start }; 
        const users = await this.userService.listUsers();
        for(let user of users) {
           await this.userChallengeService.createUserChallenges(user.user_id, CHALLENGE_TYPES.RUSH, config);
        }
        res.json({ success: true });
    }

    async addGlobalQR(req,res,next) {
        const { qr, points } = req.body;
        const config = { qr, points };
        const users = await this.userService.listUsers();
        for (let user of users) {
            await this.userChallengeService.createUserChallenges(user.user_id, CHALLENGE_TYPES.QR, config);
        }
        res.json({ success: true });
    }

    async getStreak(req, res, next) {
        const { user_id } = req.body;
        const results = await this.userChallengeService.verifyChallenge(user_id, CHALLENGE_TYPES.STREAK);
        const points = results.reduce((sum, result) => sum + result.points, 0);
        const streak = await this.userService.getStreakByUserId(user_id);
        await this._addUserPoints(user_id, points);
        res.json({ streak, points });
    }

    async _addUserPoints(user_id, points) {
        if (points !== 0) {
            await this.userService.addPointsByUserId(user_id, points);
        }
    }
}