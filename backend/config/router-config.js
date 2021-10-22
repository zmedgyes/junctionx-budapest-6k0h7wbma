const path = require('path');
const express = require('express');
const { USER_ROLES } = require('../misc/auth-util');

module.exports = {
    initRoutes: (injector) => {
        const routeHelper = injector.get('routeHelper');

        // EXAMPLE
        routeHelper.addAPIRoute('get', '/example/public', 'exampleController', 'getExamples');
        routeHelper.addAPIRoute('get', '/example/user', 'exampleController', 'getExamples', USER_ROLES.USER);
        routeHelper.addAPIRoute('get', '/example/admin', 'exampleController', 'getExamples', USER_ROLES.ADMIN);

        // USER
        routeHelper.addAPIRoute('post', '/user/register', 'userController', 'addUser');
        routeHelper.addAPIRoute('post', '/user/delete', 'userController', 'deleteUser');
        routeHelper.addAPIRoute('get', '/user/list', 'userController', 'listUsers');

        // AUTH
        // routeHelper.addAPIRoute('post', '/auth/login', 'authController', 'login');
        // routeHelper.addAPIRoute('post', '/auth/logout', 'authController', 'logout');

        // MAP
        routeHelper.addAPIRoute('post', '/map/listPOIs', 'poiController', 'listPOIs');
        routeHelper.addAPIRoute('post', '/map/getRandomPOI', 'poiController', 'getRandomPOI');

        // FRONTEND
        const app = injector.get('app');
        const frontendPath = path.resolve(`${__dirname}/../../frontend/dist`);
        app.use(express.static(frontendPath));
        app.route('/*').get((req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });
    }
};