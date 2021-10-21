const injectorMiddleware = require('../middlwares/injector-middleware');
const sessionMiddleware = require('../middlwares/session-middleware');

module.exports = {
    initMiddlewares: (injector) => {
        const app = injector.get('app');
        app.use(injectorMiddleware(injector));
        app.use(sessionMiddleware(injector));
    }
};