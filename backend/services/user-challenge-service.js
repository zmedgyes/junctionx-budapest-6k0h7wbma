const { CHALLENGE_TYPES, DEMO_QR, DEMO_LAT, DEMO_LNG } = require('../misc/types');
const { shuffleArray, isNearby, isSameDay, isNextDay } = require('../misc/util');
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
    static get $inject() { return ['db', 'overpassService', 'challengeService', 'userService']; };
    constructor(db, overpassService, challengeService, userService) {
        this.db = db;
        this.overpassService = overpassService;
        this.challengeService = challengeService;
        this.userService = userService;
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
        const results = [];
        if(userChallenges.length === 0) {
            return results;
        }
        const challenge = await this.challengeService.getChallengeByType(type);

        if (type === CHALLENGE_TYPES.TREASURE) {
            for(let userChallenge of userChallenges) {
                const qr = this.getQRToTreasure(userChallenge.params.lat, userChallenge.params.lng);
                if(qr === params.qr) {
                    if (qr !== this.getQRToTreasure(DEMO_LAT, DEMO_LNG)) {
                        await this.deleteUserChallenge(userChallenge.id );
                    }
                    results.push({ points: challenge.params.points });
                }
            }
        } else if (type === CHALLENGE_TYPES.RUSH) {
            const timeout = (challenge.params.duration / challenge.params.decline) * 60000;
            const now = new Date().getTime();
            for (let userChallenge of userChallenges) {
                const passed = (now - userChallenge.params.start);
                if (passed >= timeout) {
                    await this.deleteUserChallenge(userChallenge.id);
                } else if (isNearby(params.lat, params.lng, userChallenge.params.lat, userChallenge.params.lng, challenge.params.range)) {
                    await this.deleteUserChallenge(userChallenge.id);
                    const points = challenge.params.points - (Math.floor(passed * challenge.params.decline / 60000));
                    results.push({ points });
                } else {
                    results.push({ points: 0 });
                }
            }
        } else if (type === CHALLENGE_TYPES.RANDOM) {
            for(let userChallenge of userChallenges) {
                const randomVal = Math.random();
                if(randomVal <= challenge.params.rate) {
                    results.push({ points: challenge.params.points });
                }
            }
        } else if (type === CHALLENGE_TYPES.QR) {
            for (let userChallenge of userChallenges) {
                if(userChallenge.params.qr === params.qr) {
                    if (userChallenge.params.qr !== DEMO_QR) {
                        await this.deleteUserChallenge(userChallenge.id);
                    }
                    results.push({ points: userChallenge.params.points });
                }
            }
        } else if (type === CHALLENGE_TYPES.STREAK) {
            const user = await this.userService.getUserById(userId);
            const now = new Date().getTime();
            const streak = user.data.streak || 0;
            const lastLoginTime = user.data.lastLoginTime || now;
            if (isSameDay(lastLoginTime, now)) {
                // noop
            } else if (isNextDay(lastLoginTime, now)) {
                streak++;
                const points = Math.min(challenge.params.dailyPoints * streak, challenge.params.maxPoints);
                lastLoginTime = now;
                results.push({ points });
            } else {
                streak = 0;
                lastLoginTime = now;
            }
            await this.userService.updateUserData(userId, Object.assign(user.data, { streak, lastLoginTime }));
        }
        return results;
    }

    async createUserChallenges(userId, type, config) {
        if(type === CHALLENGE_TYPES.TREASURE) {
            const pois = await this._getTreasureChallengePOIs(type, config);
            for(let poi of pois) {
                await this._addUserChallenge(userId, type, { lat: poi.geometry.coordinates[1], lng: poi.geometry.coordinates[0] })
            }
        } else if (type === CHALLENGE_TYPES.RUSH) {
            await this._addUserChallenge(userId, type, config);
        }
        else if (type === CHALLENGE_TYPES.RANDOM) {
            await this._addUserChallenge(userId, type);
        } else if (type === CHALLENGE_TYPES.QR) {
            await this._addUserChallenge(userId, type, config);
        } else if (type === CHALLENGE_TYPES.STREAK) {
            await this._addUserChallenge(userId, type);
        }
    }

    async _addUserChallenge(userId, type, params = {}){
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