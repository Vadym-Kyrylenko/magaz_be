const Order = require('../models/collectionsSchema').Order;
const Product = require('../models/collectionsSchema').Product;

const mailModule = require('../mailModule/mailModule');
let transporter = mailModule.transporter;
let regConfirmationEmail = mailModule.regConfirmationEmail;

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
                return res.send("There are no orders");
            }
            res.status(200).send(orders);
        });
};

module.exports.postOrders = function (req, res) {
    if (!req.body) {
        return res.status(400).send("No request body");
    }
    const admins = req.adminsEmails;
    if (!(req.body.nameCustomer && req.body.email && req.body.phone && req.body.textOrder && req.body.name
            && req.body.article && (req.body.price.priceUah || req.body.price.priceUsd) && req.body.description
            && req.body.category)) {
        console.log("No request body2");
        return res.status(400).send("No request body2");
    }

    let id = req.body._id;
    Product
        .findById(id, function (err, product) {
            this.bufIm = product.bufferImg;
            const newOrder = {
                nameCustomer: req.body.nameCustomer,
                email: req.body.email,
                phone: req.body.phone,
                textOrder: req.body.textOrder,
                name: req.body.name,
                price:
                    {
                        priceUah: req.body.price.priceUah,
                        priceUsd: req.body.price.priceUsd,
                        rateUsd: req.body.price.rateUsd
                    },
                description: req.body.description,
                article: req.body.article,
                category: req.body.category,
                bufferImg: this.bufIm
            };

            const orderMessage = '<p>Поступил заказ на ' + req.body.name + '<br>артикул: ' + req.body.article +
                '<br>С ледующим коментарием: ' + req.body.textOrder + '</p>';

            Order
                .create(newOrder, function (err, order) {
                    if (!err) {
                        const confirmation = {
                            mail: '',
                            subject: 'newOrder',
                            message: orderMessage
                        };

                        admins.forEach(function (email) {
                            confirmation.mail = email;
                            transporter.sendMail(regConfirmationEmail(confirmation), function (error, info) {
                                if (error) {
                                    console.log(error.message);
                                }
                                console.log('Confirmation message sent');
                            });
                        });
                        console.log("Created order: " + order);
                        return res.status(201).send({order: order, message: 'Order saved'});

                    } else {
                        console.log(err.message);
                        res.status(409).send({message: 'Order not created'});
                    }
                });
        });
};

module.exports.deleteOrders = function (req, res) {

    if (!req.params.idOfOrder) {
        return res.status(400).send("No request params.idOfOrder");
    }
    let id = req.params.idOfOrder;
    console.log(id);
    Order
        .findByIdAndRemove(id)
        .then(function (order) {
            Order
                .find({})
                .then(function (orders) {
                    if (!orders) {
                        return res.status(404).send({orderDeleted: true, ordersFound: false});
                    }
                    if (orders.length === 0) {
                        return res.status().send({orderDeleted: true, ordersFound: true, ordersLength: false});
                    }
                    res.status(200).send({orderDeleted: true, ordersFound: true, orders: orders});
                })
                .catch(function (err) {
                    if (err) {
                        return res.status(500).send("Error while finding orders");
                    }
                });
            console.log("Removed order: " + order);
        })
        .catch(function (err) {
            res.status(304).send(err.message);
        })
};
