const path = require('path');
const express = require('express');
const { USER_ROLES } = require('../misc/auth-util');

module.exports = {
    initRoutes: (injector) => {
        const routeHelper = injector.get('routeHelper');

        // EXAMPLE
        routeHelper.addAPIRoute('get', '/public/example', 'exampleController', 'getExamples');
        routeHelper.addAPIRoute('get', '/user/example', 'exampleController', 'getExamples', USER_ROLES.USER);
        routeHelper.addAPIRoute('get', '/admin/example', 'exampleController', 'getExamples', USER_ROLES.ADMIN);

        // FRONTEND
        const app = injector.get('app');
        const frontendPath = path.resolve(`${__dirname}/../../frontend/dist`);
        app.use(express.static(frontendPath));
        app.route('/*').get((req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });
    }
};