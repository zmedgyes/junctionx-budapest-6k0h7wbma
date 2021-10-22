const queryOverpass = require('query-overpass');
module.exports = class OverpassService {
    async listPOIs(lat, lng) {
        const query = `[out: json]; node(${lat - 0.01}, ${lng - 0.01}, ${lat + 0.01}, ${lng + 0.01})[historic]; out;`;
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