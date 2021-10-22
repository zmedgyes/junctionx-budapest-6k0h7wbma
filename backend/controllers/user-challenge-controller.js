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
        const  { isValid } = await this.userChallengeService.verifyChallenge(user_id, type, params);
        if(isValid) {
            const challenge = await this.challengeService.getChallengeByType(type);
            await this.userService.addPointsByUserId(user_id, challenge.params.points);
            res.json({ success: true, points: challenge.params.points });
            return;
        }
        res.json({success: false});
    }

    async getTreasureQR(req, res, next) {
        const { id } = req.body;
        const userChallenge = await this.userChallengeService.getUserChallengeById(id);
        const qr = this.userChallengeService.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
        res.json({ qr });
    }

    async startRush(req, res, next) {
        const { lat, lng } = req.body;
        const start = new Date().getTime();
        const config = { lat, lng, start }; 
        const users = await this.userService.listUsers();
        for(let user of users) {
           await this.userChallengeService.createUserChallenges(user.user_id, type, config);
        }
    }
}