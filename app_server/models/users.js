const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
    name: {
        type: String,

        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {             //admin or customer
        type: String
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64);
};

userSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
}


module.exports.User = mongoose.model('User', userSchema);