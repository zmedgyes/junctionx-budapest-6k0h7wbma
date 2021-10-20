const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const { Client } = require('pg');
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient(process.env.REDIS_URL);
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: '21dn57aebd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

pgClient.connect();

pgClient.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pgClient.end();
});