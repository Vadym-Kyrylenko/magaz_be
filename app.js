const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
require('./app_server/models/db');
const routes = require('./app_server/routes/routes');

// const Product = require('./app_server/models/collectionsSchema').Product;
let jsonParser = bodyParser.json();
app.use(jsonParser);
app.use('/', routes);



app.listen(3000);
/*
Product.find({name: /^.l/}, function (err, product) {
    console.log(product)
});*/
