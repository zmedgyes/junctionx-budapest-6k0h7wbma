const { CHALLENGE_TYPES } = require("../misc/types");

module.exports = class UserChallengeController {
    static get $inject() { return ['userChallengeService', 'challengeService']; };

    constructor(userChallengeService, challengeService) {
        this.userChallengeService = userChallengeService;
        this.challengeService = challengeService;
    }

    async createUserChallenges(req, res, next) {
        // const user_id = req.session.user.user_id;
        const { user_id, challenge_id, config } = req.body;
        await this.userChallengeService.createUserChallenges(user_id, challenge_id, config);
        res.json({ success: true });
    }

    async createUserChallengesByType(req, res, next) {
        // const user_id = req.session.user.user_id;
        const { user_id, type, config } = req.body;
        const challenges = await this.challengeService.getChallengesByType(type);
        await this.userChallengeService.createUserChallenges(user_id, challenges[0].id, config);
        res.json({ success: true });
    }

    async getUserChallengesByUserId(req, res, next) {
        // const user_id = req.session.user.user_id;
        const { user_id } = req.body;
        const userChallenges = await this.userChallengeService.getUserChallengesByUserId(user_id);
        res.json(userChallenges);
    }

    async verifyUserChallenge(req, res, next) {
        const { id, params } = req.body;
        const isValid = await this.userChallengeService.verifyChallenge(id, params);
        if(isValid) {
            await this.userChallengeService.deleteUserChallenge(id);
        }
        res.json({success: isValid});
    }

    async getTreasureQR(req, res, next) {
        const { id } = req.body;
        const userChallenge = await this.userChallengeService.getUserChallengesById(id);
        console.log(userChallenge);
        const qr = this.userChallengeService.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
        console.log(qr);
        res.json({ qr });
    }
}