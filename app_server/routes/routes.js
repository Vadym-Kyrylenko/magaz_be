const express = require ('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

const orderControllers = require('../controllers/orderControllers');

router.get('/products', productControllers.getProducts);
router.post('/products', productControllers.postProducts);
router.put('/products', productControllers.putProducts);
router.delete('/products', productControllers.deleteProducts);
router.get('/products/:idOfProduct', productControllers.getOneProduct);

router.get('/orders', orderControllers.getOrders);
router.post('/orders', orderControllers.postOrders);
router.put('/orders', orderControllers.putOrders);
router.delete('/orders', orderControllers.deleteOrders);
router.get('/orders/:idOfOrder', orderControllers.getOneOrder);


module.exports = router;