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
        routeHelper.addAPIRoute('post', '/user/list', 'userController', 'listUsers');
        routeHelper.addAPIRoute('post', '/user/getPoints', 'userController', 'getPoints');

        routeHelper.addAPIRoute('post', '/user/challenge/list', 'userChallengeController', 'getUserChallengesByUserId');
        routeHelper.addAPIRoute('post', '/user/challenge/create', 'userChallengeController', 'createUserChallenges');
        routeHelper.addAPIRoute('post', '/user/challenge/verify', 'userChallengeController', 'verifyUserChallenge');

        routeHelper.addAPIRoute('post', '/admin/getTreasureQR', 'userChallengeController', 'getTreasureQR');
        routeHelper.addAPIRoute('post', '/admin/startRush', 'userChallengeController', 'startRush');

        // SHOP
        routeHelper.addAPIRoute('post', '/shop/listItems', 'shopController', 'listItems');
        routeHelper.addAPIRoute('post', '/shop/addItem', 'shopController', 'addItem');
        routeHelper.addAPIRoute('post', '/shop/deleteItem', 'shopController', 'deleteItem');
        routeHelper.addAPIRoute('post', '/shop/buyItem', 'shopController', 'buyItem');
        
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

        // POLL
        routeHelper.addAPIRoute('post', '/poll', 'pollController', 'poll');

        // FRONTEND
        const app = injector.get('app');
        const frontendPath = path.resolve(`${__dirname}/../../frontend/dist`);
        app.use(express.static(frontendPath));
        app.route('/*').get((req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });
    }
};