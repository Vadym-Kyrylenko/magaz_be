'use strict';

const appConfig = {
    dbUrl: 'mongodb://18.218.221.213:27017/magaz',
    // dbUrl: 'mongodb://localhost:27017/magaz',
    port: 3000,
    mongoose: {
        promiseLibrary: global.Promise,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        native_parser: true
    }
};

module.exports.APPCONST = appConfig;