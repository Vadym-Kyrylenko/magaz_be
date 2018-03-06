const express = require ('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
require('./app_server/models/db');
const routes = require('./app_server/routes/routes');



let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use('/', routes);




app.listen(3000, () => console.log('Server started...'));
