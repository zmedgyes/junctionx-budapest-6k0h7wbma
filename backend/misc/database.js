const { Client } = require('pg');
module.exports = class PgDatabase {
    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432',
            ssl: {
                rejectUnauthorized: false
            }
        });
        this.client.connect();
    }

    async query(sql) {
        return new Promise((resolve, reject) => {
            this.client.query(sql, (err, result) => {
                if (err) { reject(err); }
                else { resolve(result); }
            });
        });
    }

    close() {
        this.client.end();
    }
};