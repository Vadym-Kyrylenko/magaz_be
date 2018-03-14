const express = require ('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const orderControllers = require('../controllers/orderControllers');
const userAuth = require('../controllers/userAuthentication');

router.get('/products', productControllers.getProducts);
router.post('/products', productControllers.postProducts);
router.put('/products', productControllers.putProducts);
router.delete('/products/:idOfProduct', productControllers.deleteProducts);

// router.get('/products/:idOfProduct', productControllers.getOneProduct);

router.get('/orders', orderControllers.getOrders);
router.post('/orders', orderControllers.postOrders);
router.put('/orders', orderControllers.putOrders);
router.delete('/orders/:idOfOrder', orderControllers.deleteOrders);
//router.get('/orders/:idOfOrder', orderControllers.getOneOrder);


router.post('/register', userAuth.registerUser);
router.post('/login', userAuth.login);


module.exports = router;