const express = require ('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});
const productControllers = require('../controllers/productControllers');
const orderControllers = require('../controllers/orderControllers');
const userAuth = require('../controllers/userAuthentication');
const rateControllers = require('../controllers/rateControllers');
const userControllers = require('../controllers/userControllers');
var multer  = require('multer')
var upload = multer()

router.get('/products', productControllers.getProducts);
router.post('/products', auth, productControllers.postProducts);
router.put('/products', auth, productControllers.putProducts);
router.delete('/products/:idOfProduct', auth, productControllers.deleteProducts);
router.put('/products/:currentRate', rateControllers.putRateProducts);

router.post('/productsandimg', upload.any(), auth, productControllers.postImg);
// router.get('/products/:idOfProduct', productControllers.getOneProduct);

router.get('/orders', auth, orderControllers.getOrders);
router.post('/orders', auth, userControllers.getAllEmails, orderControllers.postOrders);
router.delete('/orders/:idOfOrder', auth, orderControllers.deleteOrders);
//router.get('/orders/:idOfOrder', orderControllers.getOneOrder);


router.post('/register', userAuth.registerUser);
router.post('/login', userAuth.loginUser);





module.exports = router;