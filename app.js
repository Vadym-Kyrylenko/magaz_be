require('dotenv').load();
const express = require ('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./app_server/models/db');
require('./app_server/config/passport');
const routes = require('./app_server/routes/routes');
const app = express();

app.use(cors());

let jsonParser = bodyParser.json();

app.use(passport.initialize());
app.use(jsonParser);
app.use('/', routes);


app.listen(3000, () => console.log('Server started...'));
