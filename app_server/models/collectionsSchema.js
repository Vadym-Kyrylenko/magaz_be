const mongoose = require ('mongoose');

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        priceUah: {
            type: Number
        },
        priceUsd: {
            type: Number
        },
        cursUsd: {
            type: Number
        }
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
    imgSrc: {
        type: String
    }
});

let orderSchema = new mongoose.Schema({
    nameCustomer: {
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
    textOrder: {
        type: String
    },

    name: {
        type: String,
        required: true
    },
    price: {
        priceUah: {
            type: Number
        },
        priceUsd: {
            type: Number
        },
        cursUsd: {
            type: Number
        }
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
    imgSrc: {
        type: String
    }
});


module.exports.Product = mongoose.model('Product', productSchema);
module.exports.Order = mongoose.model('Order', orderSchema);