const basicRoutes = require('../routes/basic-routes');
const staticRoutes = require('../routes/static-routes');

module.exports = {
    initRoutes: (injector) => {
        basicRoutes(injector);
        staticRoutes(injector);
    }
};