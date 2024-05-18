require('dotenv').config({path:'.env',override:true});
const express = require('express');
const app = express();
const {dbConfig} = require('./config.js');
console.log("config:",dbConfig)

const MyOrmLib = require('grootorm/index.js');
const ormLib = new MyOrmLib();
(async () => {
    await ormLib.initialize(dbConfig);
})();

const routes = require('./routes/routes.js');

const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

const winston = require("winston");

// config logger
const consoleTransport = new winston.transports.Console() 
const myWinstonOptions = { 
    level: process.env.LOG_LEVEL,
    transports: [consoleTransport],
    format: winston.format.json(),
} 
const logger = new winston.createLogger(myWinstonOptions) 
app.set('logger',logger)

app.set('ormLib',ormLib)

app.use('/users', routes);

app.get('/', async function (req, res) {
    res.status(200).json({ "message": "Server is up and running!!!" })
});

let port = process.env.SERVER_PORT || 8002

app.listen(port, function () {
    console.log(`application is up and running on port ${port}!!!`);
});