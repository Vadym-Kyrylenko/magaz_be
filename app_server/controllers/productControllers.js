const Product = require('../models/collectionsSchema').Product;

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
                return res.status().send("There are no products");
            }
            console.log(products);
            res.status(200).send(products);
        });
;};

module.exports.postProducts = function (req, res) {
    if (!req.body) {
        return res.status(400).send("No request body");
    }
    console.log(req.body);
    if (!(req.body.name && req.body.article &&(req.body.price.priceUah || req.body.price.priceUsd) && req.body.description && req.body.category && req.body.imgSrc)) {
        console.log("No request body2 product");
        return res.status(400).send("No request body2 product");
    }
        let newProduct = {
            name: req.body.name,
            price:
                {
                    priceUah: req.body.price.priceUah,
                    priceUsd: req.body.price.priceUsd,
                    cursUsd: req.body.price.cursUsd
                },
            description: req.body.description,
            article: req.body.article,
            category: req.body.category,
            imgSrc: req.body.imgSrc
        };
            console.log(newProduct);
    Product
        .create(newProduct, function (err, products) {
            if (!err) {

                return res.status(201).send(products);
                console.log("Created product: " + products);
            } else {
                res.status(409).send("Product not created");
            }
        });
};

module.exports.putProducts = function (req, res) {
    if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }

    if (!(req.body.name && req.body.article &&(req.body.priceUah || req.body.priceUsd) && req.body.description && req.body.category && req.body.imgSrc)) {
        console.log("No request body3");
        return res.status(400).send("No request body3");
    }
    let id = req.body._id;
    let newProduct = {
        name: req.body.name,
        price:
            {
                priceUah: req.body.priceUah,
                priceUsd: req.body.priceUsd,
                cursUsd: req.body.price.cursUsd
            },
        description: req.body.description,
        article: req.body.article,
        category: req.body.category,
        imgSrc: req.body.imgSrc
    };
    Product
        .findByIdAndUpdate(id, newProduct, {new: true}, function (err, product) {
            if (!err){
                return res.send(product);
            } else {
               /* res.status(304);*/
                res.send("Failed to update");
            }
        })
};

module.exports.deleteProducts = function (req, res) {
    console.log(req);
    console.log(req.params);
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
                .catch(function(err) {
                    if (err) {
                        return res.status(500).send("Error while finding products");
                    }
                });
            console.log("Removed product: " + product);
        })
        .catch(function (err) {
            res.status(304).send (err.message);
        })
    /*if (!req.body._id) {
        return res.status(400).send("No request body._id");
    }
    console.log(req.body._id);
    let id = req.body._id;
    Product
        .findByIdAndRemove(id, function (err, product) {
            if (!err) {
                res.status(204).send("Removed product");
                console.log("Removed product: " + product);
            } else {
                res.status(304).send ("Failed to delete");
            }
        })*/
};

module.exports.getOneProduct = function (req, res) {
    let id = req.params.idOfProduct;
    Product
        .findById(id, function (err, products) {
            if (!err) {
                console.log(products);
                res.status(200).send(products);
            } else {
                res.status(400).send("Product not found (OneProduct)")
            }
        });
};
