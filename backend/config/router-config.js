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
        routeHelper.addAPIRoute('post', '/user/getPoints', 'userController', 'getPoints');

        routeHelper.addAPIRoute('post', '/user/challenge/list', 'userChallengeController', 'getUserChallengesByUserId');
        routeHelper.addAPIRoute('post', '/user/challenge/create', 'userChallengeController', 'createUserChallenges');
        routeHelper.addAPIRoute('post', '/user/challenge/verify', 'userChallengeController', 'verifyUserChallenge');

        routeHelper.addAPIRoute('post', '/admin/getTreasureQR', 'userChallengeController', 'getTreasureQR');



        // AUTH
        // routeHelper.addAPIRoute('post', '/auth/login', 'authController', 'login');
        // routeHelper.addAPIRoute('post', '/auth/logout', 'authController', 'logout');

        // MAP
        routeHelper.addAPIRoute('post', '/poi/list', 'poiController', 'listPOIs');
        routeHelper.addAPIRoute('post', '/poi/getRandom', 'poiController', 'getRandomPOI');

        // CHALLENGE
        routeHelper.addAPIRoute('post', '/challenge/getByType', 'challengeController', 'getChallengeByType');
        routeHelper.addAPIRoute('post', '/challenge/add', 'challengeController', 'addChallenge');
        routeHelper.addAPIRoute('post', '/challenge/delete', 'challengeController', 'deleteChallenge');

        // FRONTEND
        const app = injector.get('app');
        const frontendPath = path.resolve(`${__dirname}/../../frontend/dist`);
        app.use(express.static(frontendPath));
        app.route('/*').get((req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });
    }
};