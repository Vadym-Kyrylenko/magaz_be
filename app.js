const express = require ('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
require('./app_server/models/db');
const routes = require('./app_server/routes/routes');
const routesOrder = require('./app_server/routes/routesOrders')

// const Product = require('./app_server/models/collectionsSchema').Product;
let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use('/', routes);
app.use('/orders', routesOrder)



app.listen(3000);
