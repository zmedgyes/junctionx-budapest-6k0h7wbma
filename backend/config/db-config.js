module.exports = { 
    initDB: async (injector) => {
        const db = injector.get('db');

        await db.query(`CREATE TABLE IF NOT EXISTS example (
                example_id INTEGER PRIMARY KEY AUTOINCREMENT,
                value TEXT NOT NULL
            )`);
    }
};