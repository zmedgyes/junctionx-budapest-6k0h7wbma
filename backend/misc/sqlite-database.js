const sqlite3 = require('sqlite3');
const path = require('path');

module.exports = class SQLiteDatabase {
    constructor() {
        const dbPath = process.env.NODE_ENV === 'production' ? '../db/prod.db' : '../db/dev.db';
        this.db = new sqlite3.Database(path.resolve(`${__dirname}/${dbPath}`));
    }

    async query(sql) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        this.db.close();
    }
}