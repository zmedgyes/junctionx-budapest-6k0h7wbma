const exampleRoutes = require('../routes/example-routes');
const staticRoutes = require('../routes/static-routes');

module.exports = {
    initRoutes: (injector) => {
        exampleRoutes(injector);
        staticRoutes(injector);
    }
};