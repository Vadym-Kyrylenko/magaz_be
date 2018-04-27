require('dotenv').load();
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./app_server/models/db');
const routes = require('./app_server/routes/routes');
require('./config/passport');
const express = require ('express');
const app = express();
const appconst = require('./config/constants').APPCONST;


app.use(cors());
app.use(express.static('public'));

const jsonParser = bodyParser.json();

app.use(passport.initialize());
app.use(function (err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});
app.use(jsonParser);
app.use('/', routes);


app.listen(appconst.port, () => console.log('Server started at port ' + appconst.port));