const { CHALLENGE_TYPES } = require('../misc/types');
const { shuffleArray } = require('../misc/util');
const crypto = require('crypto');

function _parseJSONFields(challenge) {
    if (!challenge) {
        return;
    }
    if (challenge.params) {
        challenge.params = JSON.parse(challenge.params);
    }
    return challenge;
}

module.exports = class UserChallengeService {
    static get $inject() { return ['db', 'overpassService', 'challengeService']; };
    constructor(db, overpassService, challengeService) {
        this.db = db;
        this.overpassService = overpassService;
        this.challengeService = challengeService;
    }

    async getUserChallengesByUserId(userId) {
        const userChallenges = await this.db.query('SELECT * FROM user_challenge WHERE user_id = ?', [userId]);
        return userChallenges.map(_parseJSONFields);
    }

    async getUserChallengesById(userChallengeId) {
        const userChallenges = await this.db.query('SELECT * FROM user_challenge WHERE id = ?', [userChallengeId]);
        return _parseJSONFields(userChallenges[0]);
    }

    async verifyChallenge(userChallengeId, params) {
        const userChallenge = await this.getUserChallengesById(userChallengeId);
        if(!userChallenge) {
            return false;
        }

        const challenge = await this.challengeService.getChallengeById(challengeId);

        if (challenge.type === CHALLENGE_TYPES.TREASURE) {
            const qr = this.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
            return qr === params.qr;
        }
        return false;
    }

    async createUserChallenges(userId, challengeId, config) {
        const challenge = await this.challengeService.getChallengeById(challengeId);
        if(challenge.type === CHALLENGE_TYPES.TREASURE) {
            const pois = await this._getTreasureChallengePOIs(challenge, config);
            for(let poi of pois) {
                await this._addUserChallenge(userId, challengeId, { lat: poi.geometry.coordinates[1], lng: poi.geometry.coordinates[0] })
            }
        }
    }

    async _addUserChallenge(userId, challengeId, params){
        await this.db.query('INSERT INTO user_challenge (user_id, challenge_id, params) VALUES (?,?,?)', [userId, challengeId, JSON.stringify(params)])
    }

    async _getTreasureChallengePOIs(challenge, config) {
        const pois = await this.overpassService.listPOIs(config.lat, config.lng, config.radius);
        shuffleArray(pois);
        return pois.slice(0, challenge.params.nodes);
    }

    getQRToTreasure(lat, lng) {
        return crypto.createHash('md5').update(`${lat}:${lng}`).digest("hex");
    }

    async deleteUserChallenge(userChallengeId) {
        await this.db.query('DELETE FROM user_challenge WHERE id = ?', [userChallengeId]);
    }
}