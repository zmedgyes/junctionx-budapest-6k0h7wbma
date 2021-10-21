const { createClient } = require('redis');

module.exports = class Redis {
    constructor() {
        this.client = createClient(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
        this.client.on('error', function (err) {
            console.log('Could not establish a connection with redis. ' + err);
        });
        this.client.on('connect', function (err) {
            console.log('Connected to redis successfully');
        });
    }
};