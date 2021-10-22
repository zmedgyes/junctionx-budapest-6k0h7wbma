const { getRandomNumber } = require("../misc/util");

module.exports = class POIController {
    static get $inject() { return ['overpassService']; }
    constructor(overpassService) {
        this.overpassService = overpassService;
    }

    async listPOIs(req, res, next) {
        const { lat, lng, radius } = req.body;
        const pois = await this.overpassService.listPOIs(lat, lng, radius);
        res.json(pois);
    }

    async getRandomPOI(req, res, next) {
        const { lat, lng, radius } = req.body;
        const pois = await this.overpassService.listPOIs(lat, lng, radius);
        if (pois.length > 0) {
            const randomPOI = pois[getRandomNumber(pois.length)];
            res.json({ lat: randomPOI.geometry.coordinates[1], lng: randomPOI.geometry.coordinates[0]});
        } else {
            res.status(404).json({ error: 'get back to the civilization!'});
        } 
    }
}