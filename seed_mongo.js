'use strict';
const appconst = require('./config/constants').APPCONST;

const mongoose = require('mongoose');
const productsArr = require('./seed/ProductsSeed');
const models = require('./app_server/models/collectionsSchema');

(function () {
    mongoose.connect(appconst.dbUrl, appconst.mongoose);
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + appconst.dbUrl);
        try {
            mongoose.connection.dropDatabase()
                .then(function () {
                    console.log('DB dropped');
                })
                .catch(function (err) {
                    throw err;
                });
            models.Product.insertMany(productsArr)
                .then(function (result) {
                    console.log('Products seeded successfully');
                })
                .then(function () {
                    mongoose.disconnect();
                    process.exit(0);
                });
        } catch (err) {
            mongoose.disconnect();
            console.error('\x1b[31mError while migrating seeders for mongoose\x1b[0m:', err);
            process.exit(1);
        }
    });
})();