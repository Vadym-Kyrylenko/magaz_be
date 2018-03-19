const express = require ('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});
const productControllers = require('../controllers/productControllers');
const orderControllers = require('../controllers/orderControllers');
const userAuth = require('../controllers/userAuthentication');

router.get('/products', productControllers.getProducts);
router.post('/products', auth, productControllers.postProducts);
router.put('/products', auth, productControllers.putProducts);
router.delete('/products/:idOfProduct', auth, productControllers.deleteProducts);

// router.get('/products/:idOfProduct', productControllers.getOneProduct);

router.get('/orders', auth, orderControllers.getOrders);
router.post('/orders', auth, orderControllers.postOrders);
router.put('/orders', auth, orderControllers.putOrders);
router.delete('/orders/:idOfOrder', auth, orderControllers.deleteOrders);
//router.get('/orders/:idOfOrder', orderControllers.getOneOrder);


router.post('/register', userAuth.registerUser);
router.post('/login', userAuth.loginUser);


module.exports = router;