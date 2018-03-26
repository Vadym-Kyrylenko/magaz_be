require('dotenv').load();
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./app_server/models/db');
const routes = require('./app_server/routes/routes');
require('./app_server/config/passport');
const express = require ('express');
const app = express();

app.use(cors());

let jsonParser = bodyParser.json();

app.use(passport.initialize());
app.use(function (err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});
app.use(jsonParser);
app.use('/', routes);


app.listen(3000, () => console.log('Server started...'));
