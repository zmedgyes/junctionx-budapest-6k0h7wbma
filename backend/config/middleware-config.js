const injectorMiddleware = require('../middlwares/injector-middleware');
const sessionMiddleware = require('../middlwares/session-middleware');
const errorMiddleware = require('../middlwares/error-middleware');
const express = require('express');
const { initRoutes } = require('./router-config');

module.exports = {
    initMiddlewares: (injector) => {
        const app = injector.get('app');
        app.use(injectorMiddleware(injector));
        //app.use(sessionMiddleware(injector));
        app.use(express.json());
        initRoutes(injector);
        app.use(errorMiddleware(injector));
    }
};