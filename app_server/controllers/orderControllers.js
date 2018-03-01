const Order = require('../models/collectionsSchema').Order;

module.exports.getOrders = function (req, res) {
    Order
        .find({})
        .exec(function (err, orders) {
            if (err) {
                return res.status(500).send("Error while finding orders");
            }
            if (!orders) {
                return res.status(404).send("Not found orders");
            }
            if (orders.length === 0) {
                return res.status().send("There are no orders");
            }
            console.log(orders);
            res.status(200).send(orders);
        });
};

module.exports.postOrders = function (req, res) {
    if (!req.body) {
        return res.status(400).send("No request body");
    }
    if (!(req.body.nameCustomer && req.body.email && req.body.phone && req.body.textOrder) &&
        !(req.body.name && req.body.article &&(req.body.priceUah || req.body.priceUsd) && req.body.description && req.body.category)) {
        console.log("No request body2");
        return res.status(400).send("No request body2");
    }
    let newOrder = {
        nameCustomer: req.body.nameCustomer,
        email: req.body.email,
        phone: req.body.phone,
        textOrder: req.body.textOrder,

        name: req.body.name,
        price:
            {
                priceUah: req.body.priceUah,
                priceUsd: req.body.priceUsd
            },
        description: req.body.description,
        article: req.body.article,
        category: req.body.category
    };

    Order
        .create(newOrder, function (err, orders) {
            if (!err) {
                return res.status(201).send(orders);
                console.log("Created order: " + orders);
            } else {
                res.status(409).send("Order not created");
            }
        });
};

module.exports.putOrders = function (req, res) {
    if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }

    if (!(req.body.nameCustomer && req.body.email && req.body.phone && req.body.textOrder) &&
        !(req.body.name && req.body.article &&(req.body.priceUah || req.body.priceUsd) && req.body.description && req.body.category)) {
        console.log("No request body3");
        return res.status(400).send("No request body3");
    }
    let id = req.body._id;
    let newOrder = {
        nameCustomer: req.body.nameCustomer,
        email: req.body.email,
        phone: req.body.phone,
        textOrder: req.body.textOrder,

        name: req.body.name,
        price:
            {
                priceUah: req.body.priceUah,
                priceUsd: req.body.priceUsd
            },
        description: req.body.description,
        article: req.body.article,
        category: req.body.category
    };
    Order
        .findByIdAndUpdate(id, newOrder, {new: true}, function (err, order) {
            if (!err){
                return res.send(order);
            } else {
                /* res.status(304);*/
                res.send("Failed to update");
            }
        })
};

module.exports.deleteOrders = function (req, res) {
    if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }
    let id = req.body._id;
    Order
        .findByIdAndRemove(id, function (err, order) {
            if (!err) {
                res.status(204).send("Removed order");
                console.log("Removed order: " + order);
            } else {
                res.status(304).send ("Failed to delete");
            }
        })
};

module.exports.getOneOrder = function (req, res) {
    let id = req.params.idOfOrder;
    Order
        .findById(id, function (err, orders) {
            if (!err) {
                console.log(orders);
                res.status(200).send(orders);
            } else {
                res.status(400).send("Order not found (OneOrder)")
            }
        });
};
