require('dotenv').config({path:'.env',override:true});
const express = require('express');
const app = express();

const {dbConfig} = require('./config.js');

const GrootORM = require('grootorm/index.js');
const ormLib = new GrootORM();
(async () => {
    console.log("initializing db")
    await ormLib.initialize(dbConfig);
})();

const routes = require('./routes/routes.js');

const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

app.set('ormLib',ormLib)

app.use('/users', routes);

app.get('/', async function (req, res) {
    res.status(200).json({ "message": "Server is up and running!!!" })
});

let port = process.env.SERVER_PORT || 8002

app.listen(port, function () {
    console.log(`application is up and running on port ${port}!!!`);
});