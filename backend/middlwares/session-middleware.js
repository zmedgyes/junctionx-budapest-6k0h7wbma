const session = require('express-session');
const connectRedis = require('connect-redis');

module.exports = (injector) => {
    const RedisStore = connectRedis(session);
    return session({
        store: new RedisStore({ client: injector.get('redis').client }),
        secret: '21dn57aebd',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS = require(reading the cookie 
            maxAge: 1000 * 60 * 10 // session max age in miliseconds
        }
    });
}