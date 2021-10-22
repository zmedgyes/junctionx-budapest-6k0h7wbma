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

    async getUserChallengesByUserIdAndType(userId, type) {
        const userChallenges = await this.db.query('SELECT * FROM user_challenge WHERE user_id = ? AND challenge_type = ?', [userId, type]);
        return userChallenges.map(_parseJSONFields);
    }

    async getUserChallengeById(userChallengeId) {
        const userChallenges = await this.db.query('SELECT * FROM user_challenge WHERE id = ?', [userChallengeId]);
        return _parseJSONFields(userChallenges[0]);
    }

    async verifyChallenge(userId, type, params) {
        const userChallenges = await this.getUserChallengesByUserIdAndType(userId, type);

        if (type === CHALLENGE_TYPES.TREASURE) {
            for(let userChallenge of userChallenges) {
                const qr = this.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
                if(qr === params.qr) {
                    return { isValid: true, id: userChallenge.id };
                }
            }
        }
        return { isValid: false };
    }

    async createUserChallenges(userId, type, config) {
        console.log(userId, type, config)
        if(type === CHALLENGE_TYPES.TREASURE) {
            console.log('createbytype')
            const pois = await this._getTreasureChallengePOIs(type, config);
            console.log()
            for(let poi of pois) {
                await this._addUserChallenge(userId, type, { lat: poi.geometry.coordinates[1], lng: poi.geometry.coordinates[0] })
            }
        }
    }

    async _addUserChallenge(userId, type, params){
        await this.db.query('INSERT INTO user_challenge (user_id, challenge_type, params) VALUES (?,?,?)', [userId, type, JSON.stringify(params)])
    }

    async _getTreasureChallengePOIs(type, config) {
        const challenge = await this.challengeService.getChallengeByType(type);
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