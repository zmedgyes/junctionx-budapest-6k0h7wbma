const Injector = require("../misc/injector");

module.exports = (Injector) => {
    return (error, req, res, next) => {
        console.error(error);
        res.status(500).send('fucked');
    }
};