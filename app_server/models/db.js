const mongoose = require ('mongoose');
const dbURI = 'mongodb://localhost:27018/magaz';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
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