const Product = require('../models/collectionsSchema').Product;


module.exports.putRateProducts = function (req, res) {
    if (!req.params.currentRate) {
        return res.status(400).send("No request currentRate");
    }

    let cursUsd = req.params.currentRate;

    console.log(cursUsd);
    Product
        .find({})
        .then(function (products) {
                products.forEach((item) => {
                    if (item.price.priceUsd === null) {
                        item.price.rateUsd = cursUsd;
                        item.save();
                    } else if (item.price.priceUsd != null){
                        console.dir(item.price.priceUah);
                        item.price.priceUah = Math.round(item.price.priceUsd * cursUsd * 100) / 100;
                        item.price.rateUsd = cursUsd;
                        item.save();
                    }
                });
                res.send({message: "Rate changed"});
            }
        )
        .catch()

}
;

