const appconst = require('../config/constants').APPCONST;
const mongoose = require ('mongoose');
// const dbURI = 'mongodb://18.218.221.213:27017/magaz';
mongoose.connect(appconst.dbUrl, appconst.mongoose);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + appconst.dbUrl);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connected error: ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//для перезапуска nodemon
process.once ('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//для завершения приложения
process.on ('/*SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

require('./collectionsSchema');