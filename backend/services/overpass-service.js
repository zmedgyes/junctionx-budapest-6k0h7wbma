const queryOverpass = require('query-overpass');
module.exports = class OverpassService {
    async listPOIs(lat, lng, radius = 0.01) {
        const query = `[out: json]; node(${lat - radius}, ${lng - radius}, ${lat + radius}, ${lng + radius})[historic]; out;`;
       return new Promise((resolve, reject) => {
           queryOverpass(query, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result.features);
            }
           });
       });
    }
};