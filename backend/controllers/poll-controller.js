const { CHALLENGE_TYPES } = require("../misc/types");

module.exports = class PollController {
    static get $inject() { return ['userChallengeService', 'challengeService', 'userService']; };

    constructor(userChallengeService, challengeService, userService) {
        this.userChallengeService = userChallengeService;
        this.challengeService = challengeService;
        this.userService = userService;
    }

    async poll(req, res, next) {
        const { user_id, lat, lng } = req.body;
        const rushResult = await this._checkRush(user_id, lat, lng);
        const randomResult = await this._checkRandom(user_id);
        res.json({
            ...rushResult,
            ...randomResult
        });
    }

    async _checkRush(user_id, lat, lng) {
        const results = await this.userChallengeService.verifyChallenge(user_id, CHALLENGE_TYPES.RUSH, { lat,  lng });
        const hasRush = results.length > 0;
        const rushPoints = results.reduce((sum, result) => sum + result.points, 0);
        if (rushPoints > 0) {
            await this.userService.addPointsByUserId(user_id, rushPoints);
        }
        return { hasRush, rushPoints };
    }

    async _checkRandom(user_id) {
        const results = await this.userChallengeService.verifyChallenge(user_id, CHALLENGE_TYPES.RANDOM, {});
        const randomPoints = results.reduce((sum, result) => sum + result.points, 0);
        return { randomPoints };
    }
}