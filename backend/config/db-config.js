module.exports = { 
    initDB: async (injector) => {
        const db = injector.get('db');

        // MIGARTION
        // await db.query(`DROP TABLE IF EXISTS db_migration`);
        await db.query(`CREATE TABLE IF NOT EXISTS db_migration (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT NOT NULL UNIQUE
            )`);
        
        // EXAMPLE
        // await db.query(`DROP TABLE IF EXISTS example`);
        await db.query(`CREATE TABLE IF NOT EXISTS example (
                example_id INTEGER PRIMARY KEY AUTOINCREMENT,
                value TEXT NOT NULL
            )`);

        // USER
        // await db.query(`DROP TABLE IF EXISTS user`);
        await db.query(`CREATE TABLE IF NOT EXISTS user (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                roles JSON NOT NULL,
                data JSON NOT NULL
            )`);

        
        // CHALLENGE
        // await db.query(`DROP TABLE IF EXISTS challenge`);
        await db.query(`CREATE TABLE IF NOT EXISTS challenge (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL UNIQUE,
                params JSON NOT NULL
            )`);


        // await db.query(`DROP TABLE IF EXISTS user_challenge`);
        await db.query(`CREATE TABLE IF NOT EXISTS user_challenge (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                challenge_type TEXT NOT NULL,
                params JSON NOT NULL
            )`);
    }
};