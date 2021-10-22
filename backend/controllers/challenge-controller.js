module.exports = class ChallengeController {
    static get $inject() { return ['challengeService']; };

    constructor(challengeService) {
        this.challengeService = challengeService;
    }

    async getChallengesByType(req, res, next) {
        const { type } = req.body;
        const challenges = await this.challengeService.getChallengesByType(type);
        res.json(challenges);
    }

    async addChallenge(req, res, next) {
        const { type, name, params } = req.body;
        await this.challengeService.addChallenge(type, name, params);
        res.json({ success: true });
    }

    async deleteChallenge(req, res, next) {
        const { id } = req.body;
        await this.challengeService.deleteChallenge(id);
        res.json({ success: true });
    }
}