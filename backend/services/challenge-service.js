function _parseJSONFields(challenge) {
    if (!challenge) {
        return;
    }
    if (challenge.params) {
        challenge.params = JSON.parse(challenge.params);
    }
    return challenge;
}

module.exports = class ChallengeService {
    static get $inject() { return ['db']; };
    constructor(db) {
        this.db = db;
    }

    async getChallengeById(id) {
        const res = await this.db.query('SELECT * FROM challenge WHERE id = ?', [id]);
        return _parseJSONFields(res[0]);
    }

    async getChallengeByType(type) {
        const challenges = await this.db.query('SELECT * FROM challenge WHERE type = ?', [type]);
        return _parseJSONFields(challenges[0]);
    }

    async addChallenge(type, params = {}) {
        await this.db.query('INSERT INTO challenge (type, params) VALUES(?,?)', [type, JSON.stringify(params)]);
    }

    async deleteChallenge(id) {
        await this.db.query('DELETE FROM challenge WHERE id = ?', [id]);
    }
}