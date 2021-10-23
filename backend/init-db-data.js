const { getInjector } = require('./config/injector-config');
const { initDB } = require('./config/db-config');
const { USER_ROLES } = require('./misc/auth-util');
const { CHALLENGE_TYPES, SHOP_ITEM_TYPES, DEMO_LAT, DEMO_LNG } = require('./misc/types');

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
        },
        async (injector) => {
            const challengeService = injector.get('challengeService');
            await challengeService.updateChallengeByType(CHALLENGE_TYPES.GOTO, { radius: 0.01, points: 100 });
            await challengeService.updateChallengeByType(CHALLENGE_TYPES.TREASURE, { radius: 0.01, nodes: 10, points: 50 });
        },
        async (injector) => {
            const challengeService = injector.get('challengeService');
            await challengeService.addChallenge(CHALLENGE_TYPES.RUSH, { points: 1200, decline: 10, range: 50 });
            await challengeService.addChallenge(CHALLENGE_TYPES.RANDOM, { points: 5, rate: 0.01 });
            const userService = injector.get('userService');
            const userChallengeService = injector.get('userChallengeService');
            const users = await userService.listUsers();
            for(let user of users){
                await userChallengeService.createUserChallenges(user.user_id, CHALLENGE_TYPES.RANDOM);
            }
        },
        async (injector) => {
            const challengeService = injector.get('challengeService');
            await challengeService.addChallenge(CHALLENGE_TYPES.QR, {});
        },
        async (injector) => {
            const challengeService = injector.get('challengeService');
            await challengeService.addChallenge(CHALLENGE_TYPES.STREAK, { dailyPoints: 1, maxPoints: 20 });

            const userService = injector.get('userService');
            const userChallengeService = injector.get('userChallengeService');
            const users = await userService.listUsers();
            for (let user of users) {
                await userChallengeService.createUserChallenges(user.user_id, CHALLENGE_TYPES.STREAK);
            }
        },
        async (injector) => {
            const shopService = injector.get('shopService');
            await shopService.addItem(190, { type: SHOP_ITEM_TYPES.MINUTE, offer: "60 minutes, single use", amount: "60 minutes", balance:60 });
            await shopService.addItem(165, { type: SHOP_ITEM_TYPES.MINUTE, offer: "45 minutes, single use", amount: "45 minutes", balance: 45 });
            await shopService.addItem(125, { type: SHOP_ITEM_TYPES.MINUTE, offer: "30 minutes, single use", amount: "30 minutes", balance: 30 });
            await shopService.addItem(50, { type: SHOP_ITEM_TYPES.MINUTE, offer: "10 minutes, single use", amount: "10 minutes", balance: 10 });
            await shopService.addItem(3590, { type: SHOP_ITEM_TYPES.DATA, offer: "5 GB data, roaming capable", amount: "5 GB", balance: 5 });
            await shopService.addItem(990, { type: SHOP_ITEM_TYPES.DATA, offer: "500 MB data, roaming capable", amount: "500 MB", balance: 0.5 });
            await shopService.addItem(210, { type: SHOP_ITEM_TYPES.DATA, offer: "100 MB data", amount: "100 MB", balance: 0.1 });
            await shopService.addItem(85, { type: SHOP_ITEM_TYPES.DATA, offer: "30 MB data", amount: "30 MB", balance: 0.03 });

            const userService = injector.get('userService');
            const users = await userService.listUsers();
            for (let user of users) {
                await userService.updateUserData(user.user_id, Object.assign(user.data, { dataBalance: 20.5 }));
            }
        },
        async (injector) => {
            const userService = injector.get('userService');
            const userChallengeService = injector.get('userChallengeService');
            const users = await userService.listUsers();
            for (let user of users) {
                await userChallengeService._addUserChallenge(user.user_id, CHALLENGE_TYPES.TREASURE, { lat: DEMO_LAT, lng: DEMO_LNG });
            }
        },

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
