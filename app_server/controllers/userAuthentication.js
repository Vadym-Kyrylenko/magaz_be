const passport = require('passport');
const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('../models/users').User;

let sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.registerUser = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password  = req.body.password;

    // user.setPassword(req.body.password);

    user.save(function(err) {
        let token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }
    });
};

module.exports.login = function (req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

  /*  passport.authenticate('????????????', function (err, user, info) {
        let token;
        if(err) {
            sendJSONresponse(res, 404, err);
            return
        }
        if(user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    }) (req, res);*/
};
