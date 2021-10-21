const { getInjector } = require('./config/injector-config');
const { initMiddlewares } = require('./config/middleware-config');
const { initApp } = require('./config/app-config');

const injector = getInjector();

initMiddlewares(injector);
initApp(injector);