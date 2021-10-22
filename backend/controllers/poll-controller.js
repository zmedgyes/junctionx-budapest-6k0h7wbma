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


    }

    async _checkRush(user_id, lat, lng) {
        const { isValid, id, points } = this.userChallengeService.verifyChallenge(user_id, CHALLENGE_TYPES.RUSH, { lat,  lng });
        if(isValid) {
            await this.userService.addPointsByUserId(user_id, points);
            await this.userChallengeService.deleteUserChallenge(id);
        }
    }
}