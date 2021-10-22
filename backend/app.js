const { getInjector } = require('./config/injector-config');
const { initDB } = require('./config/db-config');
const { initMiddlewares } = require('./config/middleware-config');
const { initApp } = require('./config/app-config');

(async () => {
    const injector = getInjector();

    initMiddlewares(injector);
    await initDB(injector);
    initApp(injector);
})();
