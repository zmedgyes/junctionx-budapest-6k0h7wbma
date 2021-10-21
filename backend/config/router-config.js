const basicRoutes = require('../routes/basic');

module.exports = {
    initRoutes: (injector) => {
        basicRoutes(injector);
    }
};