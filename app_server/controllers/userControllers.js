'use strict';

const User = require('../models/users').User;

module.exports.getUsers = function (req, res) {
    User
        .find({})
        .exec(function (err, users) {
            if (err) {
                return res.status(500).send("Error while finding users");
            }
            if (!users) {
                return res.status(404).send("Not found users");
            }
            if (users.length === 0) {
                return res.send("There are no users");
            }
            console.log(users);
            res.status(200).send(users);
        });
};

module.exports.registerUsers = function (req, res) {
    if (!req.body) {
        return res.status(400).send("No request body");
    }
    console.log(req.body);
    if (!(req.body.name && req.body.email && req.body.password && req.body.salt && req.body.hash && req.body.role)) {
        console.log("No request body2 user");
        return res.status(400).send("No request body2 user");
    }
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        salt: req.body.salt,
        hash: req.body.hash
    };
    console.log(newUser);
    User
        .create(newUser, function (err, user) {
            if (!err) {

                console.log("Created user: " + user);
                return res.status(201).send(user);
            } else {
                res.status(409).send("User not created");
            }
        });
};

module.exports.putUsers = function (req, res) {
    if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }

    if (!(req.body.name && req.body.email && req.body.password && req.body.salt && req.body.hash && req.body.role)) {
        console.log("No request body3");
        return res.status(400).send("No request body3");
    }
    let id = req.body._id;
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        salt: req.body.salt,
        hash: req.body.hash
    };
    User
        .findByIdAndUpdate(id, newUser, {new: true}, function (err, user) {
            if (!err){
                return res.send(user);
            } else {
                res.send("Failed to update");
            }
        })
};

module.exports.deleteUsers = function (req, res) {
    console.log(req);
    console.log(req.params);
    if (!req.params.idOfUser) {
        return res.status(400).send("No request params.idOfUser");
    }
    let id = req.params.idOfUser;
    console.log(id);
    User
        .findByIdAndRemove(id)
        .then(function (user) {
            User
                .find({})
                .then(function (users) {
                    if (!users) {
                        return res.status(404).send({userDeleted: true, usersFound: false});
                    }
                    if (users.length === 0) {
                        return res.status().send({userDeleted: true, usersFound: true, usersLength: false});
                    }
                    res.status(200).send({userDeleted: true, usersFound: true, users: users});
                })
                .catch(function(err) {
                    if (err) {
                        return res.status(500).send("Error while finding users");
                    }
                });
            console.log("Removed user: " + user);
        })
        .catch(function (err) {
            res.status(304).send (err.message);
        })
};

module.exports.getOneUser = function (req, res) {
    let id = req.params.idOfUser;
    User
        .findById(id, function (err, users) {
            if (!err) {
                console.log(users);
                res.status(200).send(users);
            } else {
                res.status(400).send("User not found (OneUser)")
            }
        });
};

module.exports.getAllEmails = function (req, res, next) {
    User
        .find({})
        .then(function (users) {
            if (!users) {
                console.log('No admins');
                req.adminsEmails = [];
                next();
            }
            if (users.length === 0) {
                console.log('No admins');
                req.adminsEmails = [];
                next();
            }
            req.adminsEmails = users.map(function(user) {
                return user.email;
            });
            next();
        })
        .catch(function (err) {
            console.log('Error while finding admins');
            console.log(err);
            req.adminsEmails = [];
            next();
        });
};