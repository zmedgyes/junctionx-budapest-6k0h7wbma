const Injector = require('../misc/injector');
const Redis = require('../misc/redis');
//const PgDatabase = require('../misc/pg-database');
const SQLiteDatabase = require('../misc/sqlite-database');
const express = require('express');
const RouteHelper = require('../misc/route-helper');

const ExampleService = require('../services/example-service');
const UserService = require('../services/user-service');
const OverpassService = require('../services/overpass-service');
const ChallengeService = require('../services/challenge-service');
const UserChallengeService = require('../services/user-challenge-service');

const ExampleController = require('../controllers/example-controller');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/auth-controller');
const POIController = require('../controllers/poi-controller');
const ChallengeController = require('../controllers/challenge-controller');
const UserChallengeController = require('../controllers/user-challenge-controller');

module.exports = {
    getInjector: () => {
        const injector = new Injector();

        //SINGLETONS
        //injector.addConstant('redis', new Redis());
        injector.addConstant('db', new SQLiteDatabase());
        injector.addConstant('app', express());

        //SERVICES
        injector.addClass('routeHelper', RouteHelper);
        injector.addClass('exampleService', ExampleService);
        injector.addClass('userService', UserService);
        injector.addClass('overpassService', OverpassService);
        injector.addClass('challengeService', ChallengeService);
        injector.addClass('userChallengeService', UserChallengeService);


        //CONTROLLERS
        injector.addClass('exampleController', ExampleController);
        injector.addClass('userController', UserController);
        injector.addClass('authController', AuthController);
        injector.addClass('poiController', POIController);
        injector.addClass('challengeController', ChallengeController);
        injector.addClass('userChallengeController', UserChallengeController);

        return injector;
    }
};