const Product = require('../models/collectionsSchema').Product;
const fs = require("fs");

module.exports.getProducts = function (req, res) {
    Product
        .find({})
        .exec(function (err, products) {
            if (err) {
                return res.status(500).send("Error while finding products");
            }
            if (!products) {
                return res.status(404).send("Not found products");
            }
            if (products.length === 0) {
                return res.send("There are no products");
            }
            res.status(200).send(products);
        });
};

module.exports.postImg = function (req, res) {
    const buffer = req.files[0].buffer;
    const article = req.files[0].fieldname;

    fs.writeFile('./public/images/' + article + '.jpg', buffer, (err) => console.log(err));
    const imgPath = 'http://46.172.70.39:3000/images/' + article + '.jpg';
    Product
        .findOneAndUpdate({article: article}, {$set: {imgSrc: imgPath}}, {new: true}, function (err, products) {
            if (!err) {
                console.log(products);
                res.status(200).send(products);
            } else {
                res.status(400).send("Product not found (OneProduct)");
            }
        });
};
module.exports.postProducts = function (req, res) {

    if (!req.body) {
        return res.status(400).send("No request body");
    }
    if (!(req.body.name && req.body.article && (req.body.price.priceUah || req.body.price.priceUsd) &&
        req.body.description && req.body.category)) {
        console.log("No request body2 product");
        return res.status(400).send("No request body2 product");
    }
    let newProduct = {
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
    };

    Product
        .create(newProduct, function (err, product) {
            if (!err) {
                console.log("Created product: " + product);
                return res.status(201).send({product: product, message: 'Product saved'});
            } else {
                res.status(409).send({message: 'Product not created'});
            }
        });
};

module.exports.putProducts = function (req, res) {

    if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }
    if (!(req.body.name && req.body.article && (req.body.price.priceUah || req.body.price.priceUsd) &&
        req.body.description && req.body.category)) {
        console.log("No request body3");
        return res.status(400).send("No request body3");
    }
    let id = req.body._id;
    let newProduct = {
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
    };
    Product
        .findByIdAndUpdate(id, newProduct, {new: true}, function (err, product) {
            if (!err) {
                return res.send({product: product, message: 'Product edited'});
            } else {
                res.send({message: 'Product not edited'});
            }
        });
};

module.exports.deleteProducts = function (req, res) {
    if (!req.params.idOfProduct) {
        return res.status(400).send("No request params.idOfProduct");
    }
    let id = req.params.idOfProduct;
    console.log(id);
    Product
        .findByIdAndRemove(id)
        .then(function (product) {
            Product
                .find({})
                .then(function (products) {
                    if (!products) {
                        return res.status(404).send({productDeleted: true, productsFound: false});
                    }
                    if (products.length === 0) {
                        return res.status().send({productDeleted: true, productsFound: true, productsLength: false});
                    }
                    res.status(200).send({productDeleted: true, productsFound: true, products: products});
                })
                .catch(function (err) {
                    if (err) {
                        return res.status(500).send("Error while finding products");
                    }
                });
            console.log("Removed product: " + product);
        })
        .catch(function (err) {
            res.status(304).send(err.message);
        });
};