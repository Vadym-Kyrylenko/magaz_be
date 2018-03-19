const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users').User;

let sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.registerUser = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required (register)"
        });
        return;
    }

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password  = req.body.password;

    user.setPassword(req.body.password);

    user.save(function(err) {
        let token;

        if (err) {
            console.log(err.message);
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }
    });
};

module.exports.loginUser = function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required (login)"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        let token;
        if(err) {
            sendJSONresponse(res, 404, err);
            return
        }
        if(user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                'token' : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};
