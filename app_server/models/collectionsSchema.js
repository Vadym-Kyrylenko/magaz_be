const mongoose = require ('mongoose');

let userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
       // type: Number
        priceUah: {
            type: Number,
            /*required: true*/
        },
        priceUsd: {
            type: Number,
            /*required: true*/
        },
    },
    description: {
        type: String
    },
    article: {
        type: String
    },
    category: {
        type: String
    },
});

let orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    text: {
        type: String
    },
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Product = mongoose.model('Product', productSchema);
module.exports.Order = mongoose.model('Order', orderSchema);