const { Client } = require('pg');
module.exports = class PgDatabase {
    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL || 'postgresql://jx21:jx21@localhost:5432',
            ssl: process.env.NODE_ENV === 'prodiction' ? {
                rejectUnauthorized: false
            } : undefined
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