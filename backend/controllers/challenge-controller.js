module.exports = class ChallengeController {
    static get $inject() { return ['challengeService']; };

    constructor(challengeService) {
        this.challengeService = challengeService;
    }

    async getChallengeByType(req, res, next) {
        const { type } = req.body;
        const challenge = await this.challengeService.getChallengeByType(type);
        res.json(challenge);
    }

    async addChallenge(req, res, next) {
        const { type, params } = req.body;
        await this.challengeService.addChallenge(type, params);
        res.json({ success: true });
    }

    async deleteChallenge(req, res, next) {
        const { id } = req.body;
        await this.challengeService.deleteChallenge(id);
        res.json({ success: true });
    }
}