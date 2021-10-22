module.exports = { 
    initDB: async (injector) => {
        const db = injector.get('db');

        // MIGARTION
        await db.query(`CREATE TABLE IF NOT EXISTS db_migration (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT NOT NULL UNIQUE
            )`);
        
        // EXAMPLE
        await db.query(`CREATE TABLE IF NOT EXISTS example (
                example_id INTEGER PRIMARY KEY AUTOINCREMENT,
                value TEXT NOT NULL
            )`);

        // USER
        await db.query(`CREATE TABLE IF NOT EXISTS user (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                roles JSON NOT NULL,
                data JSON NOT NULL
            )`);
    }
};