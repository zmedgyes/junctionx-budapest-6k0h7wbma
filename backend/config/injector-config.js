const Injector = require('../misc/injector');
const Redis = require('../misc/redis');
//const PgDatabase = require('../misc/pg-database');
const SQLiteDatabase = require('../misc/sqlite-database');
const express = require('express');
const RouteHelper = require('../misc/route-helper');

const ExampleService = require('../services/example-service');

const ExampleController = require('../controllers/example-controller');

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


        //CONTROLLERS
        injector.addClass('exampleController', ExampleController);

        return injector;
    }
};