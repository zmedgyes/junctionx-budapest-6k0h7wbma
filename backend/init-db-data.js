const { getInjector } = require('./config/injector-config');
const { initDB } = require('./config/db-config');
const { USER_ROLES } = require('./misc/auth-util');
const { CHALLENGE_TYPES } = require('./misc/types');

(async () => {
    const injector = getInjector();
    await initDB(injector);

    const migrations = [
        async (injector) => {
            const userService = injector.get('userService');
            await userService.addUser('admin@admin.com', 'admin');
            const adminUser = await userService.getUserWithPasswordByEmail('admin@admin.com');
            await userService.updateUserRoles(adminUser.user_id, [USER_ROLES.USER, USER_ROLES.ADMIN]);
        },
        async (injector) => {
            const challengeService = injector.get('challengeService');
            await challengeService.addChallenge(CHALLENGE_TYPES.GOTO, { radius: 0.01 });
            await challengeService.addChallenge(CHALLENGE_TYPES.TREASURE, { radius: 0.01, nodes: 10 });
        }
    ];

    const db = injector.get('db');
    const completedMigrations = await db.query(`SELECT * FROM db_migration`);
    const completedKeys = new Set(completedMigrations.map(m => m.key));
    const registerCompletedMigartion = async (idx) => {
        await db.query(`INSERT INTO db_migration (key) VALUES (?)`, [idx]);
    }
    
    for(let idx in migrations) {
        if(!completedKeys.has(idx)) {
            await migrations[idx](injector);
            await registerCompletedMigartion(idx);
            console.log(`Migartion complete: ${idx}`);
        }
    }
})();
