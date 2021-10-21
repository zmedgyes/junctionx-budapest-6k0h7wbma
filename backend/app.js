const { getInjector } = require('./config/injector-config');
const { initMiddlewares } = require('./config/middleware-config');
const { initRoutes } = require('./config/router-config');
const { initApp } = require('./config/app-config');

const injector = getInjector();

initMiddlewares(injector);
initRoutes(injector);
initApp(injector);