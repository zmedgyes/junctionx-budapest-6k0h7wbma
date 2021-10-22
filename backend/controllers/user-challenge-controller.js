const { CHALLENGE_TYPES } = require("../misc/types");

module.exports = class UserChallengeController {
    static get $inject() { return ['userChallengeService', 'challengeService']; };

    constructor(userChallengeService, challengeService) {
        this.userChallengeService = userChallengeService;
        this.challengeService = challengeService;
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
        const  { isValid, id } = await this.userChallengeService.verifyChallenge(user_id, type, params);
        if(isValid) {
            await this.userChallengeService.deleteUserChallenge(id);
        }
        res.json({success: isValid});
    }

    async getTreasureQR(req, res, next) {
        const { id } = req.body;
        const userChallenge = await this.userChallengeService.getUserChallengeById(id);
        const qr = this.userChallengeService.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
        console.log(qr);
        res.json({ qr });
    }
}