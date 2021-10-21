const Injector = require('../misc/injector');
const Redis = require('../misc/redis');
const Database = require( '../misc/database');
const express = require('express');

module.exports = {
    getInjector: () => {
        const injector = new Injector();

        //injector.addConstant('redis', new Redis());
        //injector.addConstant('db', new Database());
        injector.addConstant('app', express());

        return injector;
    }
};