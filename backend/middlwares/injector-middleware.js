const Injector = require('../misc/injector.js');

module.exports = (injector) => {
    return (req, res, next) => {
        req.injector = new Injector(injector.configs);
        next();
    }
}